const pageShell = document.querySelector('.page-shell');
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const backToTop = document.querySelector('.back-to-top');
const imageLightbox = document.querySelector('.image-lightbox');
const lightboxImage = imageLightbox.querySelector('img');

pageShell.classList.add('theme-arla');

const updateBackToTopVisibility = () => { backToTop.hidden = window.scrollY <= 200; };
window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();

const openImage = (image) => {
	lightboxImage.src = image.src;
	lightboxImage.alt = image.alt;
	imageLightbox.showModal();
};
const makeZoomable = (image) => {
	image.tabIndex = 0;
	image.setAttribute('role', 'button');
	image.setAttribute('aria-label', `Ampliar imagem: ${image.alt}`);
	image.addEventListener('click', () => openImage(image));
	image.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(image); }
	});
};
document.querySelectorAll('.product-image img, .portrait').forEach(makeZoomable);

imageLightbox.querySelector('.image-lightbox-close').addEventListener('click', () => imageLightbox.close());
imageLightbox.addEventListener('click', (event) => { if (event.target === imageLightbox) imageLightbox.close(); });

tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		const target = tab.dataset.tab;
		tabs.forEach((item) => {
			const active = item === tab;
			item.classList.toggle('is-active', active);
			item.setAttribute('aria-selected', active);
		});
		pageShell.classList.remove('theme-arla', 'theme-bardahl', 'theme-about');
		if (tab.dataset.theme) pageShell.classList.add(`theme-${tab.dataset.theme}`);
		else if (target === 'sobre') pageShell.classList.add('theme-about');
		panels.forEach((panel) => {
			const visible = panel.id === target;
			panel.classList.toggle('is-visible', visible);
			panel.hidden = !visible;
		});
	});
});

const empresas = [
	{ nome: 'Ferreira Costa', logo: 'imagens/sobremim/ferreiracosta.png', descricao: 'Atuação em atendimento comercial, treinamento e vendas no varejo e em pontos de atuação em Garanhuns, Recife e Salvador.' },
	{ nome: 'Dancor', logo: 'imagens/sobremim/dancor.png', descricao: 'Promotor de vendas em Garanhuns com foco em vendas técnicas, prospecção e dimensionamentos.' },
	{ nome: 'Suvinil', logo: 'imagens/sobremim/suvinil.png', descricao: 'Promotor de vendas em Recife, com atuação no segmento de pigmentação e relacionamento com clientes.' },
	{ nome: 'Chiaperini', logo: 'imagens/sobremim/chiaperini.png', descricao: 'Promotor técnico de vendas atuando em Pernambuco, Ceará e Maranhão, com foco em soluções e atendimento técnico.' },
	{ nome: 'Hydronlubz', logo: 'imagens/sobremim/hydronlubz.png', descricao: 'Técnico vendedor externo no Nordeste, com presença em 9 estados, palestras e treinamentos para clientes e equipes.' },
	{ nome: 'Shell', logo: 'imagens/sobremim/sheel.png', descricao: 'Representante comercial em Pernambuco, com atuação voltada para relacionamento e resultados comerciais.' },
	{ nome: 'Rep. Renato Silva', logo: 'imagens/logo renato.png', descricao: 'Representante comercial em Pernambuco, com foco em atendimento ao cliente e expansão de carteira.' },
	{ nome: 'Gasoleo', logo: 'imagens/sobremim/gasoleo.png', descricao: 'Vendedor interno e de campo em Pernambuco, com atenção ao atendimento comercial e à rede de clientes.' },
	{ nome: 'Flach', logo: 'imagens/sobremim/flach.png', descricao: 'Supervisor regional no Norte e Nordeste, com liderança de equipe, treinamento e acompanhamento comercial.' }
];
const companyTabs = document.getElementById('companyTabs');

empresas.forEach((empresa, index) => {
	const card = document.createElement('article');
	card.className = 'company-card';
	card.setAttribute('role', 'listitem');

	const button = document.createElement('button');
	button.type = 'button';
	button.className = 'company-tab';
	button.id = `company-tab-${index}`;
	button.setAttribute('aria-controls', `company-description-${index}`);
	button.setAttribute('aria-expanded', 'false');

	const logo = document.createElement('img');
	logo.src = empresa.logo;
	logo.alt = '';
	logo.setAttribute('aria-hidden', 'true');
	const name = document.createElement('span');
	name.className = 'company-name';
	name.textContent = empresa.nome;
	const indicator = document.createElement('span');
	indicator.className = 'company-indicator';
	indicator.setAttribute('aria-hidden', 'true');
	indicator.textContent = '+';
	button.append(logo, name, indicator);

	button.addEventListener('click', () => {
		const abrir = button.getAttribute('aria-expanded') !== 'true';
		companyTabs.querySelectorAll('.company-tab').forEach((otherButton) => {
			const expanded = otherButton === button && abrir;
			otherButton.setAttribute('aria-expanded', String(expanded));
			otherButton.closest('.company-card').classList.toggle('is-expanded', expanded);
			document.getElementById(otherButton.getAttribute('aria-controls')).hidden = !expanded;
		});
	});

	const description = document.createElement('div');
	description.className = 'company-description';
	description.id = `company-description-${index}`;
	description.setAttribute('role', 'region');
	description.setAttribute('aria-labelledby', button.id);
	description.setAttribute('aria-live', 'polite');
	description.hidden = true;
	const descriptionText = document.createElement('p');
	descriptionText.textContent = empresa.descricao;
	description.appendChild(descriptionText);

	card.append(button, description);
	companyTabs.appendChild(card);
});

const bardahlCategorias = [
	{
		id: 'combustivel',
		nome: 'Aditivo Combustível',
		total: 10,
		items: [
			{ nome: 'CLEAN GAS', img: 'imagens/produtos/bardahl/CLEAN20GAS.png' },
			{ nome: 'FLEX', img: 'imagens/produtos/bardahl/BARDAHL FLEX.png' },
			{ nome: 'MAX TOP', img: 'imagens/produtos/bardahl/MAXTOP.png' },
			{ nome: 'SPECIAL 6X1' },
			{ nome: 'MAX HYBRID', img: 'imagens/produtos/bardahl/MAX20HYBRID.png' },
			{ nome: 'PROAL', img: 'imagens/produtos/bardahl/BARDAHL PROAL.png' },
			{ nome: 'MAX POWER MOTO' },
			{ nome: 'MAX DIESEL', img: 'imagens/produtos/bardahl/MAX20DIESEL.png' },
			{ nome: 'MAX S10', img: 'imagens/produtos/bardahl/BARDAHL MAX S10.png' },
			{ nome: 'MAX POWER DIESEL' }
		]
	},
	{
		id: 'motor',
		nome: 'Aditivo Motor',
		total: 5,
		items: [
			{ nome: 'B12 PREMIUM', img: 'imagens/produtos/bardahl/B122020Premium.png' },
			{ nome: 'B12 TURBO', img: 'imagens/produtos/bardahl/B122020TURBO.png' },
			{ nome: 'B12', img: 'imagens/produtos/bardahl/CONDICIONADOR.png' },
			{ nome: 'CONDICIONADOR DE METAIS', img: 'imagens/produtos/bardahl/B12.png' },
			{ nome: 'PROLONGA', img: 'imagens/produtos/bardahl/PROLONGA.png' }
		]
	},
	{
		id: 'radiador',
		nome: 'Aditivo Radiador',
		total: 3,
		items: [
			{ nome: 'RAD COOL CONCENTRADO', img: 'imagens/produtos/bardahl/RAD20COOL.png' },
			{ nome: 'RAD COOL PRONTO USO', img: 'imagens/produtos/bardahl/RAD20COOL20PRONTO20PRA20USO201L.png' },
			{ nome: 'FLUIDO', img: 'imagens/produtos/bardahl/FLUIDO20ROSA201L.png' }
		]
	},
	{
		id: 'moto',
		nome: 'Lubrificante Moto',
		total: 2,
		items: [
			{ nome: 'MAXTEC 20W50', img: 'imagens/produtos/bardahl/MAXTEC20PERFORMANCE20MOTO2020W50.png' },
			{ nome: 'MAXTEC 10W30', img: 'imagens/produtos/bardahl/MAXTEC20PERFORMANCE20MOTO2010W30.png' }
		]
	}
];

const catTabs = document.getElementById('catTabs');
const catPanels = document.getElementById('catPanels');
const pad = (n) => String(n).padStart(2, '0');
const label = (n) => `${n} ${n === 1 ? 'item' : 'itens'}`;

bardahlCategorias.forEach((cat) => {
	const lista = Array.from({ length: cat.total }, (_, i) => cat.items[i] || {
		nome: `Produto ${pad(i + 1)}`,
		desc: 'Em breve mais detalhes deste produto.'
	});

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'cat-tab';
	btn.id = `cat-tab-${cat.id}`;
	btn.setAttribute('role', 'tab');
	btn.setAttribute('aria-controls', `cat-${cat.id}`);
	btn.innerHTML = `<strong>${cat.nome}</strong><span>${label(cat.total)}</span>`;
	catTabs.appendChild(btn);

	const panel = document.createElement('div');
	panel.className = 'cat-panel';
	panel.id = `cat-${cat.id}`;
	panel.setAttribute('role', 'tabpanel');
	panel.setAttribute('aria-labelledby', btn.id);
	panel.innerHTML = `<div class="cat-heading"><h3>${cat.nome}</h3><span>${label(cat.total)}</span></div><div class="product-grid"></div>`;
	const grid = panel.querySelector('.product-grid');

	lista.forEach((p, i) => {
		const card = document.createElement('article');
		card.className = 'product-card';
		card.innerHTML = `
			<div class="product-image bardahl-product-image" style="background-color:rgb(173,166,31);">
				${p.img ? `<img src="${p.img}" alt="${p.nome}">` : '<div class="ph" aria-hidden="true"></div>'}
				<span class="product-number">${pad(i + 1)}</span>
			</div>
			<div class="product-info"><div><p class="category">Bardahl</p><h3>${p.nome}</h3>
			<p class="product-description">${p.desc || ''}</p></div></div>`;
		const img = card.querySelector('img');
		if (img) makeZoomable(img);
		grid.appendChild(card);
	});

	catPanels.appendChild(panel);
});

const selectCategoria = (id) => {
	catTabs.querySelectorAll('.cat-tab').forEach((button) => {
		const ativo = button.getAttribute('aria-controls') === `cat-${id}`;
		button.classList.toggle('is-active', ativo);
		button.setAttribute('aria-selected', ativo);
	});
	catPanels.querySelectorAll('.cat-panel').forEach((panel) => { panel.hidden = panel.id !== `cat-${id}`; });
};
catTabs.addEventListener('click', (event) => {
	const button = event.target.closest('.cat-tab');
	if (button) selectCategoria(button.getAttribute('aria-controls').replace('cat-', ''));
});
selectCategoria(bardahlCategorias[0].id);

const moreBtn = document.getElementById('bardahlMore');
const extra = document.getElementById('bardahlExtra');
moreBtn.addEventListener('click', () => {
	const abrir = extra.hidden;
	extra.hidden = !abrir;
	moreBtn.setAttribute('aria-expanded', abrir);
	moreBtn.querySelector('.more-label').textContent = abrir ? 'Ver menos' : 'Ver mais';
	if (abrir) extra.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
