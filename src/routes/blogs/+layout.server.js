export const load = async () => {
	try {
		const blogs = await fetchDataFromDatabase();
		return { blogs };
	} catch (error) {
		return { status: 500, error: new Error('Failed to load data') };
	}
};

async function fetchDataFromDatabase() {
	const data = [
		{
			title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			tags: ['meaow', 'xiaomi', 'infinix'],
			src: '',
			intro: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dignissimos consectetur quod
				esse iste omnis quasi ea quam eos. Dolorum dolor amet libero fuga quaerat cum, dicta quasi
				eaque hic repudiandae labore ducimus, ullam earum illo ratione doloremque fugit et sequi
				facere, quas culpa! Cumque at eaque laborum quam, quo rerum incidunt aspernatur architecto,
				totam repellat aut. Repudiandae voluptatem dolore aperiam modi dolorum Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Voluptate atque maxime fugit eius, natus expedita quaerat
				in impedit omnis, ad adipisci porro eveniet totam qui reprehenderit a nobis molestiae sequi
				laudantium facere deleniti ullam repellendus. Nemo odit perferendis ducimus in autem nostrum
				sit maxime aliquid officia exercitationem! Voluptatum, officia. Sit. Lorem ipsum dolor sit
				amet consectetur, adipisicing elit. Dolorem suscipit ad incidunt quisquam, accusamus illo
				ipsum explicabo qui doloremque cupiditate distinctio nesciunt aut ducimus modi officia
				exercitationem unde dolor illum perferendis et amet cum voluptatem libero ab? Nam quae
				explicabo eos deleniti temporibus dignissimos! Quisquam asperiores accusamus quam a.
				Consequatur, soluta amet non enim magni excepturi praesentium necessitatibus ratione minima
				nobis eos odio ab ipsum ea, quae veniam saepe, aliquid modi qui repudiandae esse dolore
				mollitia perspiciatis. Iure repudiandae alias eius nulla aliquid accusamus corporis
				dignissimos dolorem quas laudantium nesciunt, soluta totam ipsa non maiores commodi quis
				cumque, in id.`,
			createdAt: '20th Aug, 2024',
			link: '/post1'
		},
		{
			title: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat est sequi excepturi quos
				dolores maxime.`,
			tags: ['sample', 'another sample', 'and another sample'],
			src: '',
			intro: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dignissimos consectetur quod
				esse iste omnis quasi ea quam eos. Dolorum dolor amet libero fuga quaerat cum, dicta quasi
				eaque hic repudiandae labore ducimus, ullam earum illo ratione doloremque fugit et sequi
				facere, quas culpa! Cumque at eaque laborum quam, quo rerum incidunt aspernatur architecto,
				totam repellat aut. Repudiandae voluptatem dolore aperiam modi dolorum Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Voluptate atque maxime fugit eius, natus expedita quaerat
				in impedit omnis, ad adipisci porro eveniet totam qui reprehenderit a nobis molestiae sequi
				laudantium facere deleniti ullam repellendus. Nemo odit perferendis ducimus in autem nostrum
				sit maxime aliquid officia exercitationem! Voluptatum, officia. Sit. Lorem ipsum dolor sit
				amet consectetur, adipisicing elit. Dolorem suscipit ad incidunt quisquam, accusamus illo
				ipsum explicabo qui doloremque cupiditate distinctio nesciunt aut ducimus modi officia
				exercitationem unde dolor illum perferendis et amet cum voluptatem libero ab? Nam quae
				explicabo eos deleniti temporibus dignissimos! Quisquam asperiores accusamus quam a.
				Consequatur, soluta amet non enim magni excepturi praesentium necessitatibus ratione minima
				nobis eos odio ab ipsum ea, quae veniam saepe, aliquid modi qui repudiandae esse dolore
				mollitia perspiciatis. Iure repudiandae alias eius nulla aliquid accusamus corporis
				dignissimos dolorem quas laudantium nesciunt, soluta totam ipsa non maiores commodi quis
				cumque, in id.`,
			createdAt: '07th Sep, 2025',
			link: '/post2'
		}
	];
	return data;
}
