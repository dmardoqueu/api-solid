import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    await request.jwtVerify({ onlyCookie: true }) // só verifica o cookie

    const { role } = request.user

    const token = await reply.jwtSign(
        {
            role
        },
        {
            sign: {
                sub: request.user.sub,
            },
        },
    )

    const refreshToken = await reply.jwtSign(
        {
            role
        },
        {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d',
            },
        },
    )

    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true, // only use in https
            sameSite: true, // csrf
            httpOnly: true, // no access via js
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        .status(200)
        .send({
            token,
        })
}