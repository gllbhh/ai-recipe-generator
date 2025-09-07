import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	BedrockResponse: a.customType({
		body: a.string(),
		error: a.string(),
	}),

	askBedrock: a
		.query()
		.arguments({ ingredients: a.string().array() })
		.returns(a.ref("BedrockResponse"))
		.authorization((allow) => [allow.publicApiKey()]) // <-- use publicApiKey for API key auth
		.handler(a.handler.custom({ entry: "./bedrock.js" })),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "apiKey",
		apiKeyAuthorizationMode: { expiresInDays: 30 },
	},
});
