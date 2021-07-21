// pages/api/auth/[...nextauth].js
import axios from 'axios';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    const user = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
                        name: credentials.username,
                        password: credentials.password
                    });
                    if (user.data) {
                        //console.log('Response from server auth:', user.data);
                        return user.data;
                    }
                    return null;
                } catch (e) {
                    console.log(e);
                    const errorMsg = e.response.data.message[0].messages[0].message;
                    throw new Error(errorMsg);
                }
            }
        })
    ],
    session: {
        jwt: true
    },
    callbacks: {
        jwt: async (token, user) => {
            if (user) {
                token.jwt = user.jwt;
                token.user = user.user;
            }
            return Promise.resolve(token);
        },
        session: async (session, token) => {
            session.jwt = token.jwt;
            session.user = token.user;
            console.log('Session its solving to ->', session);
            return Promise.resolve(session);
        }
    }
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
