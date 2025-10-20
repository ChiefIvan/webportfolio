export async function load({ params, request }) {
	const user = {
		bio: `Hi!, My name is Ivan, a 23 years old Instructor at Davao Oriental State University
				(DOrSU), where I also earned my Bachelor's degree in Information Technology. with a 
				year of teaching experience, I'm passionate about sharing knowledge and inspiring others.
				Beyond the classroom, I'm a developer and designer,
				specializing in mobile/web development and an enthusiastic explorer of artificial
				intelligence. My curiosity drives me to embrace new challenges and continuously expand my
				skill set. During my internship, I gained hands-on experience in programming, technical
				support, networking, packaging, and sales communication, which honed my adaptability and
				technical expertise. Whether I'm coding innovative apps, designing, or diving into AI
				projects, I approach every task with dedication and a eagerness to learn. I'm excited to
				contribute my skills and passion to both my students and the ever-evolving world of
				technology.`,
		academics: [
			{
				level: 'Tertiary',
				degree: 'Bachelor of Science in Information Technology Major in Business Analytics',
				school: 'Davao Oriental State University (DOrSU)',
				address: 'Guang-guang, Dahican, Mati City, Davao Oriental, Philippines, 8200',
				academicYear: '2019 - 2023'
			},
			{
				level: 'Senior High School',
				degree: 'Computer System Servicing',
				school: 'Lupon Vocation High School (LVHS)',
				address: 'Kambing Baratua St., Lupon, Davao Oriental, Philippines, 8207',
				academicYear: 'S.Y. 2018 - 2020'
			},
			{
				level: 'Secondary',
				school: 'Lupon Vocation High School (LVHS)',
				address: 'Kambing Baratua St., Lupon, Davao Oriental, Philippines, 8207',
				academicYear: 'S.Y. 2014 - 2018'
			},
			{
				level: 'Elementary',
				school: 'Macangao Central Elementary School (MCES)',
				address: 'Limbahan, Lupon, Davao Oriental, Philippines, 8207',
				academicYear: 'S.Y. 2008 - 2014'
			}
		],
		experiences: [
			{
				title: 'DOrSU (Faculty of Computing, Engineering and Technology)',
				description: `I am an IT Instructor in Information Tech Department at Davao Oriental State University, where I am engaged in shaping
				the next generation of tech professionals. In this role, I deliver IT courses, fostering
				student growth and development. My responsibilities include preparing and delivering
				lectures, creating engaging lesson plans, and assessing student performance. I am dedicated
				to providing a supportive learning environment that encourages critical thinking and
				innovation. Through my work, I aim to inspire students to pursue excellence in the field of
				information technology.`,
				isCurrent: true
			},
			{
				title: 'DorSU (Information Communication Technology Unit)',
				description: `During my undergraduate internship at Davao Oriental State University (DOrSU), I had the
				opportunity to work as a Technical Support Intern within the Information Communication
				Technology Unit. In this role, I provided essential technical support to both faculty and
				staff, addressing hardware and software issues to ensure smooth IT operations. I assisted in
				troubleshooting network problems, setting up new equipment, and maintaining the university's
				IT infrastructure. This experience allowed me to develop strong problem-solving skills,
				enhance my technical knowledge, and gain hands-on experience in a dynamic IT environment.`,
				isCurrent: false
			},
			{
				title: 'Computer World',
				description: `During my undergraduate internship at Davao Oriental State University (DOrSU), I had the
				opportunity to work as a Technical Support Intern within the Information Communication
				Technology Unit. In this role, I provided essential technical support to both faculty and
				staff, addressing hardware and software issues to ensure smooth IT operations. I assisted in
				troubleshooting network problems, setting up new equipment, and maintaining the university's
				IT infrastructure. This experience allowed me to develop strong problem-solving skills,
				enhance my technical knowledge, and gain hands-on experience in a dynamic IT environment.`,
				isCurrent: false
			},
			{
				title: 'Self-Learning & Personal Projects',
				description: `In addition to my formal education and internships, I have actively pursued self-learning
				and personal projects to further enhance my skills in mobile and web development, as well as
				artificial intelligence. I have completed various online courses and tutorials to stay updated
				with the latest technologies and best practices in the field. Through personal projects, I have
				applied my knowledge to create innovative applications and solutions, allowing me to gain
				hands-on experience and deepen my understanding of programming concepts. This proactive approach
				to learning has helped me develop a well-rounded skill set and a passion for continuous growth in
				the tech industry.`,
				isCurrent: false
			}
		]
	};

	return user;
}
