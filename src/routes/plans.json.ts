import plans from './plansData.json';

export async function get() {
	return {
		status: 200,
		body: plans
	};
}
