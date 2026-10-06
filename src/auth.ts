import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "credenciales",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined)?.trim().toLowerCase();
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario || !usuario.activo) return null;

        const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
        if (!passwordValida) return null;

        return {
          id: usuario.id,
          name: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          distritoId: usuario.distritoId,
          debeCambiarPassword: usuario.debeCambiarPassword,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.rol = user.rol as string;
        token.distritoId = user.distritoId as string | null;
        token.debeCambiarPassword = Boolean(user.debeCambiarPassword);
        return token;
      }

      // Cada petición revalida contra la base: una cuenta desactivada pierde acceso al instante
      // y los cambios de rol, distrito o contraseña temporal se reflejan sin volver a iniciar sesión.
      const usuario = await prisma.usuario.findUnique({
        where: { id: token.id as string },
        select: { activo: true, rol: true, distritoId: true, debeCambiarPassword: true },
      });
      if (!usuario || !usuario.activo) return null;

      token.rol = usuario.rol;
      token.distritoId = usuario.distritoId;
      token.debeCambiarPassword = usuario.debeCambiarPassword;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.rol = token.rol as "JOVEN" | "ASESOR" | "NACIONAL";
        session.user.distritoId = token.distritoId as string | null;
        session.user.debeCambiarPassword = Boolean(token.debeCambiarPassword);
      }
      return session;
    },
  },
});
