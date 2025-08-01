import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getRanking } from '../functions/get-ranking'
import z from 'zod'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/ranking',
        {
            schema: {
                summary: 'Get subscriber invites count',
                tags: ['referral'],
                response: {
                    200: z.object({
                        ranking: z.array(
                            z.object({
                                id: z.string(),
                                name: z.string(),
                                score: z.number(),
                            })
                        ),
                    }),
                },
            },
        },
        async request => {
            const { rankingWithScore } = await getRanking()

            return { ranking: rankingWithScore }
        }
    )
}
