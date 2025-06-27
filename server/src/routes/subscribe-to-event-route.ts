import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/subscriptions",
		{
			schema: {
				description: "Subscribe to an event",
				tags: ["Subscriptions"],
				summary: "Subscribe to an event with name and email",
				body: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				response: {
					201: z.object({
						name: z.string(),
						email: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, email } = request.body as { name: string; email: string };

			return reply.status(201).send({
				name,
				email,
			});
		},
	);
};
