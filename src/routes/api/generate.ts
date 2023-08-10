import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const getSummary = async (description: string) => {
	if (!configuration.apiKey) {
		return 'Something went wrong.';
	}
	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: 'Give the minimum qualifications of the following job listing: ' + description
				}
			],
			temperature: 0.6
		});
		return completion.data.choices[0].message?.content?.trim();
	} catch (error) {
		console.log(error);
	}
	return 'Error in completion.';
};

export default getSummary;
