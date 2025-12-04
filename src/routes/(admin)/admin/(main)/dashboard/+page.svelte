<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import PageTitle from '$lib/components/shared/pageTitle.svelte';

	let session = null;

	onMount(() => {
		session = $page.data.session;

		if (!session) {
			goto('/admin/dashboard');
		}
	});
</script>

<svelte:head>
	<title>Dashboard - Admin</title>
</svelte:head>

<div class="content-wrapper">
	<PageTitle text="Dashboard" borderColor="var(--dark-theme-color-6)"></PageTitle>
	<h1>Admin Dashboard</h1>
	{#if session}
		<p>Welcome, {session.user.name}!</p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, alias. Officia quas non quaerat
		sint accusantium repellendus quia odio quibusdam maxime perferendis in tempore ex saepe vitae, facilis
		consequuntur architecto optio repellat maiores neque earum et. Molestias, amet optio? Voluptas nulla
		cum necessitatibus minus maiores quod a similique vel accusantium porro maxime deleniti obcaecati
		ullam, quaerat voluptates dolorum praesentium possimus rerum reiciendis! Laudantium temporibus nemo
		vel. Blanditiis, minima ullam. Earum modi iure impedit eum accusamus veritatis, nulla pariatur accusantium
		dolores aliquam quis nam suscipit adipisci ratione mollitia odio tempore repellendus aut at minus
		doloremque quibusdam praesentium dolorem? Dolore esse officia, laborum nam sed ipsum totam in dolorum
		vero enim mollitia ex. Minima ad rem consequatur sunt corrupti voluptates voluptatibus maiores quos
		repudiandae suscipit molestiae quasi, accusantium quibusdam labore saepe vero placeat impedit ex!
		Sapiente explicabo mollitia veritatis ullam. Ipsa officia voluptatibus at non iste autem, provident
		alias quas consequatur temporibus nihil labore possimus consequuntur est ea odit quo! Odio dicta
		magnam tenetur exercitationem quisquam cumque neque, in ipsa id laudantium omnis ducimus excepturi
		vero! Aperiam, eius laboriosam ipsum recusandae quo facilis et eos, quaerat laborum voluptas doloremque
		beatae enim, culpa facere saepe deleniti. Eligendi eum natus dignissimos itaque voluptatum cupiditate
		repudiandae sed neque, voluptas nihil vero veritatis beatae, fugit ab tenetur sequi doloribus velit
		nam quis excepturi officia, sapiente cum dolores ipsum! Debitis at et accusantium. Officiis eligendi
		animi nihil maxime? Nisi perferendis reiciendis aut quod? Natus, adipisci. Deleniti praesentium illum
		nisi nostrum vero adipisci possimus enim esse. Eaque fugiat reiciendis sit ullam numquam doloremque
		possimus dolor, dolore aspernatur quod illo tenetur cum ratione iste voluptatum adipisci velit id
		eveniet deleniti placeat. Reprehenderit velit provident odit iure asperiores cupiditate quam, rerum
		ad voluptates voluptate, nemo, atque architecto? Beatae dignissimos ipsum deserunt repudiandae officia
		quidem porro tenetur eveniet provident nisi. Minima laborum quod magnam nostrum debitis? Iusto blanditiis
		sit ipsa iure numquam, quos ad deleniti odio assumenda velit aperiam. Laboriosam quaerat aliquid
		tempore vitae assumenda, voluptatibus non eligendi odio nesciunt neque voluptatum ipsa suscipit.
		Sunt porro nesciunt mollitia sit nemo explicabo ducimus nam odit unde, praesentium obcaecati cumque
		saepe velit sequi reiciendis tempora cum ea iste assumenda omnis perferendis. Dignissimos suscipit
		voluptatum iste iure. Perspiciatis distinctio ab aliquam facere id nam aut excepturi est veritatis,
		quam quae deleniti recusandae magnam! Porro at voluptates recusandae repudiandae ipsa iste expedita
		rem obcaecati mollitia quam repellendus, ea nisi qui dolores in! Doloribus veniam animi reprehenderit
		modi praesentium odit at saepe ab, fugiat quidem voluptas dolorum nesciunt numquam incidunt quisquam,
		in tenetur! Excepturi blanditiis nobis temporibus vitae deleniti, cupiditate animi officiis a, explicabo,
		vel labore ipsum quia accusantium iusto maxime quidem placeat sapiente mollitia? Laborum, culpa quibusdam
		inventore cumque commodi minima consequatur rerum laboriosam, maiores veritatis voluptates. Veritatis
		veniam facere minima ullam obcaecati possimus nam, earum libero inventore impedit, totam quam amet,
		fugiat rerum similique nobis laudantium sequi iure doloribus quas enim voluptas tempora laborum voluptatem.
		Neque ducimus magnam similique possimus numquam architecto sequi dolores nemo saepe perspiciatis
		voluptas modi ab a accusamus, ullam laboriosam doloremque iste voluptates repellendus repellat veritatis.
		Debitis, amet voluptatibus itaque eveniet ab officia? Iusto voluptate earum soluta ab nam velit eaque
		facere quos laudantium, cum voluptatem sit ratione harum quam porro ipsam explicabo. Id accusantium,
		similique eius animi quam mollitia distinctio blanditiis odit illo rerum dolore, explicabo velit
		fuga placeat voluptate unde aliquid porro necessitatibus! Et pariatur necessitatibus incidunt totam
		tenetur rem quae quas placeat qui eum nobis voluptates ut, blanditiis a consequatur ad recusandae
		nemo provident? Quo sint consequuntur magni debitis in optio corrupti, impedit sapiente? Fuga debitis
		beatae mollitia aspernatur blanditiis quos voluptates distinctio rem eligendi iusto delectus, labore
		aperiam quasi veritatis omnis eum quod exercitationem aut quam autem earum repudiandae! Quae velit
		necessitatibus quia, voluptatem laboriosam autem earum, rem illum facere rerum ab eos numquam explicabo,
		ipsam vel. Consectetur temporibus fugit hic odit molestiae perspiciatis, unde, incidunt officia dolores
		pariatur minima corrupti. Id sequi expedita adipisci tempore aut omnis deleniti ut laborum doloribus,
		placeat ex, aliquam distinctio sed dolore! Consectetur consequuntur soluta molestias doloremque corrupti
		eum ut veniam libero? Consectetur impedit amet voluptatem, alias magnam reiciendis recusandae minus
		cumque molestias atque dolor ipsam est deleniti molestiae placeat non! Eum quo incidunt aperiam itaque
		tempora minima. Explicabo perferendis corrupti non, voluptas ducimus excepturi vero dignissimos consectetur
		modi at? Itaque esse, architecto amet incidunt ut facere commodi unde velit culpa veniam, autem corrupti
		dignissimos. Dicta asperiores quam, nam dolore eos corporis! Dignissimos ipsum eos perspiciatis.
		Animi, repellat vel! Debitis repudiandae excepturi vel adipisci laudantium suscipit facere ipsam
		soluta, officiis tempore, facilis quisquam ex rem officia, nemo illo expedita consectetur. Corporis
		deserunt doloribus quae tempora quod, ipsum exercitationem accusantium cum dolorem iure aut asperiores
		ad amet officiis fuga? Aut, temporibus magnam, maxime, labore obcaecati nam animi dolore debitis
		odio repudiandae nemo voluptatibus? Tempore quos eos ad doloribus cupiditate excepturi sint. Aliquid
		libero consequatur esse numquam ratione enim sit voluptatibus. Commodi, soluta. Harum dignissimos
		reiciendis, facilis placeat aut eaque laborum eum veniam ipsa voluptatibus. Molestias aspernatur
		harum fugit ad quos. Et hic voluptatibus velit, asperiores quaerat, cum ex totam consequuntur ad
		explicabo quis ipsa at beatae cupiditate ipsum. Cupiditate perspiciatis illo officia. Nam atque provident
		tenetur, libero exercitationem ab placeat dolores accusantium totam accusamus beatae pariatur ipsum
		asperiores quasi est, fuga, eius aliquid facilis officiis minima nesciunt. Similique esse accusamus,
		ad vitae velit enim exercitationem repudiandae, labore maxime totam dolores aspernatur ipsa temporibus
		quaerat. Eveniet consectetur eius accusamus ipsa maxime ducimus id sunt? Incidunt nihil, reprehenderit
		magnam laboriosam facilis labore autem corporis amet iste, qui optio alias! Aliquam nobis et eligendi?
		Illum sint aspernatur similique quibusdam natus. Praesentium dolore voluptas quam aut tempora in
		vitae esse voluptatibus, inventore facilis impedit. Adipisci illum temporibus sit mollitia voluptas
		recusandae consequuntur placeat, illo laborum eum praesentium sed cum neque iste accusantium totam
		aut modi nihil dolores dolore optio consequatur. Optio, esse enim asperiores rem consequatur saepe
		aperiam at debitis labore iusto totam quos, voluptatem veritatis delectus nulla quasi voluptas! Et
		tenetur dignissimos voluptatum officia reprehenderit iste non id eos repellendus quaerat beatae,
		soluta reiciendis.
	{/if}
</div>

<style>
</style>
