const pageShell = document.querySelector('.page-shell');
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const backToTop = document.querySelector('.back-to-top');
const imageLightbox = document.querySelector('.image-lightbox');
const lightboxImage = imageLightbox.querySelector('img');

pageShell.classList.add('theme-arla');

document.querySelector('.brand').addEventListener('click', () => {
	document.getElementById('tab-sobre').click();
});

const addProductOrderControls = (card) => {
	const title = card.querySelector('.product-info h3');
	if (!title || card.querySelector('.product-title-row')) return;

	const productName = title.textContent.trim();
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'product-select';
	checkbox.setAttribute('aria-label', `Selecionar ${productName}`);
	const selectLabel = document.createElement('label');
	selectLabel.className = 'product-select-label';
	selectLabel.append(checkbox, document.createTextNode('Comprar'));

	const titleRow = document.createElement('div');
	titleRow.className = 'product-title-row';
	title.before(titleRow);
	titleRow.appendChild(title);
	titleRow.after(selectLabel);

	const quantityLabel = document.createElement('label');
	quantityLabel.className = 'product-quantity';
	quantityLabel.hidden = true;
	quantityLabel.append(document.createTextNode('Quantidade '));

	const quantity = document.createElement('input');
	quantity.type = 'number';
	quantity.className = 'product-quantity-input';
	quantity.min = '1';
	quantity.step = '1';
	quantity.value = '1';
	quantity.required = true;
	quantity.setAttribute('aria-label', `Quantidade de ${productName}`);
	quantityLabel.appendChild(quantity);
	selectLabel.after(quantityLabel);
};

document.querySelectorAll('.product-card').forEach(addProductOrderControls);

const orderPhone = '5587991021576';
const cartButton = document.querySelector('[data-cart-open]');
const cartDialog = document.querySelector('.shopping-cart-dialog');
const cartItems = cartDialog.querySelector('[data-cart-items]');
const cartCategory = cartDialog.querySelector('[data-cart-category]');

const getActiveOrderPanel = () => document.querySelector('.category-panel.is-visible');

const renderCart = () => {
	const panel = getActiveOrderPanel();
	const selected = panel
		? Array.from(panel.querySelectorAll('.product-card')).filter((card) => card.querySelector('.product-select')?.checked)
		: [];
	cartItems.replaceChildren();
	cartCategory.textContent = panel?.id === 'arla' ? 'Arla Eco 32' : 'Bardahl';

	selected.forEach((card) => {
		const name = card.querySelector('.product-info h3').textContent.trim();
		const code = card.querySelector('.product-number')?.textContent.trim() || '';
		const sourceQuantity = card.querySelector('.product-quantity-input');
		const item = document.createElement('article');
		item.className = 'shopping-cart-item';

		const details = document.createElement('div');
		details.className = 'shopping-cart-item-details';
		const productName = document.createElement('strong');
		productName.textContent = name;
		const productCode = document.createElement('span');
		productCode.textContent = `Código ${code}`;
		details.append(productName, productCode);

		const controls = document.createElement('div');
		controls.className = 'shopping-cart-item-controls';
		const quantityLabel = document.createElement('label');
		quantityLabel.textContent = 'Qtd.';
		const quantity = document.createElement('input');
		quantity.type = 'number';
		quantity.className = 'shopping-cart-quantity';
		quantity.min = '1';
		quantity.step = '1';
		quantity.required = true;
		quantity.value = sourceQuantity.value;
		quantity.setAttribute('aria-label', `Quantidade de ${name}`);
		quantityLabel.appendChild(quantity);

		const remove = document.createElement('button');
		remove.type = 'button';
		remove.className = 'shopping-cart-remove';
		remove.dataset.cartRemove = '';
		remove.textContent = 'Remover';
		remove.setAttribute('aria-label', `Remover ${name} da compra`);
		controls.append(quantityLabel, remove);
		item.append(details, controls);
		cartItems.appendChild(item);
	});
};

const updateOrderLinks = () => {
	document.querySelectorAll('[data-order-actions]').forEach((actions) => {
		const panel = actions.closest('.category-panel');
		const selected = Array.from(panel.querySelectorAll('.product-card'))
			.filter((card) => card.querySelector('.product-select')?.checked);
		const items = selected.map((card) => ({
			code: card.querySelector('.product-number')?.textContent.trim(),
			quantity: card.querySelector('.product-quantity-input')
		}));
		const valid = items.every(({ code, quantity }) => (
			code && quantity.validity.valid && Number.isInteger(Number(quantity.value))
		));
		const message = [
			'Oi, tudo bem! Gostaria de fazer o seguinte pedido:',
			...items.map(({ code, quantity }, index) => `${index + 1}. ${code} quantidade ${quantity.value}`)
		].join('\n');

		actions.hidden = selected.length === 0;
		const link = actions.querySelector('[data-order-link]');
		link.href = `https://wa.me/${orderPhone}?text=${encodeURIComponent(message)}`;
		link.setAttribute('aria-disabled', String(!valid));
		link.classList.toggle('is-disabled', !valid);
		const count = selected.length;
		link.querySelector('span').textContent = `Fazer pedido pelo WhatsApp (${count} ${count === 1 ? 'produto' : 'produtos'})`;
	});

	const activePanel = getActiveOrderPanel();
	const activeSelectionCount = activePanel
		? activePanel.querySelectorAll('.product-select:checked').length
		: 0;
	cartButton.hidden = activeSelectionCount === 0;
	cartButton.querySelector('[data-cart-count]').textContent = activeSelectionCount;
	cartButton.setAttribute('aria-label', `Ver minha compra, ${activeSelectionCount} ${activeSelectionCount === 1 ? 'produto' : 'produtos'}`);
};

cartButton.addEventListener('click', () => {
	renderCart();
	cartDialog.showModal();
});
cartDialog.querySelector('[data-cart-checkout]').addEventListener('click', () => {
	const panel = getActiveOrderPanel();
	const orderLink = panel?.querySelector('[data-order-link]');
	if (!orderLink || orderLink.getAttribute('aria-disabled') === 'true') {
		if (panel) {
			Array.from(panel.querySelectorAll('.product-card'))
				.filter((card) => card.querySelector('.product-select')?.checked)
				.map((card) => card.querySelector('.product-quantity-input'))
				.find((quantity) => !quantity.validity.valid)
				?.reportValidity();
		}
		return;
	}

	cartDialog.close();
	window.setTimeout(() => {
		orderLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
		orderLink.focus({ preventScroll: true });
	}, 0);
});
cartDialog.querySelectorAll('[data-cart-close]').forEach((button) => {
	button.addEventListener('click', () => cartDialog.close());
});
cartDialog.addEventListener('click', (event) => {
	if (event.target === cartDialog) cartDialog.close();
});
cartDialog.addEventListener('input', (event) => {
	const quantity = event.target.closest('.shopping-cart-quantity');
	if (!quantity) return;
	const item = quantity.closest('.shopping-cart-item');
	const code = item.querySelector('.shopping-cart-item-details span').textContent.replace('Código ', '');
	const panel = getActiveOrderPanel();
	const card = Array.from(panel.querySelectorAll('.product-card'))
		.find((product) => product.querySelector('.product-number')?.textContent.trim() === code);
	const sourceQuantity = card?.querySelector('.product-quantity-input');
	if (sourceQuantity) {
		sourceQuantity.value = quantity.value;
		updateOrderLinks();
	}
});
cartDialog.addEventListener('change', (event) => {
	const quantity = event.target.closest('.shopping-cart-quantity');
	if (!quantity) return;
	if (!quantity.validity.valid || !Number.isInteger(Number(quantity.value))) {
		quantity.value = '1';
	}
	const item = quantity.closest('.shopping-cart-item');
	const code = item.querySelector('.shopping-cart-item-details span').textContent.replace('Código ', '');
	const panel = getActiveOrderPanel();
	const card = Array.from(panel.querySelectorAll('.product-card'))
		.find((product) => product.querySelector('.product-number')?.textContent.trim() === code);
	const sourceQuantity = card?.querySelector('.product-quantity-input');
	if (sourceQuantity) sourceQuantity.value = quantity.value;
	updateOrderLinks();
});
cartDialog.addEventListener('click', (event) => {
	const removeButton = event.target.closest('[data-cart-remove]');
	if (!removeButton) return;
	const item = removeButton.closest('.shopping-cart-item');
	const code = item.querySelector('.shopping-cart-item-details span').textContent.replace('Código ', '');
	const panel = getActiveOrderPanel();
	const card = Array.from(panel.querySelectorAll('.product-card'))
		.find((product) => product.querySelector('.product-number')?.textContent.trim() === code);
	if (card) {
		card.querySelector('.product-select').checked = false;
		card.querySelector('.product-select-label').classList.remove('is-selected');
		card.querySelector('.product-quantity').hidden = true;
		card.querySelector('.product-quantity-input').value = '1';
	}
	updateOrderLinks();
	renderCart();
	if (cartItems.childElementCount === 0) cartDialog.close();
});

document.querySelector('main').addEventListener('click', (event) => {
	const clearButton = event.target.closest('[data-clear-order]');
	if (clearButton) {
		const panel = clearButton.closest('.category-panel');
		panel.querySelectorAll('.product-card').forEach((card) => {
			card.querySelector('.product-select').checked = false;
			card.querySelector('.product-select-label').classList.remove('is-selected');
			const quantityLabel = card.querySelector('.product-quantity');
			quantityLabel.hidden = true;
			quantityLabel.querySelector('input').value = '1';
		});
		updateOrderLinks();
		return;
	}

	const link = event.target.closest('[data-order-link]');
	if (!link || link.getAttribute('aria-disabled') !== 'true') return;
	event.preventDefault();
	Array.from(link.closest('.category-panel').querySelectorAll('.product-card'))
		.filter((card) => card.querySelector('.product-select')?.checked)
		.map((card) => card.querySelector('.product-quantity-input'))
		.find((quantity) => !quantity.validity.valid)
		?.reportValidity();
});

document.querySelector('main').addEventListener('change', (event) => {
	const checkbox = event.target.closest('.product-select');
	if (checkbox) {
		const quantityLabel = checkbox.closest('.product-select-label').nextElementSibling;
		quantityLabel.hidden = !checkbox.checked;
		checkbox.closest('.product-select-label').classList.toggle('is-selected', checkbox.checked);
		if (checkbox.checked) quantityLabel.querySelector('input').focus();
		updateOrderLinks();
		if (cartDialog.open) renderCart();
		return;
	}

	if (event.target.matches('.product-quantity-input')) {
		if (!event.target.validity.valid) event.target.value = '1';
		updateOrderLinks();
	}
});

document.querySelector('main').addEventListener('input', (event) => {
	if (event.target.matches('.product-quantity-input')) updateOrderLinks();
});

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
		updateOrderLinks();
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
		total: 9,
		items: [
			{ codigo: '0203', nome: 'CLEAN GAS', img: 'imagens/produtos/bardahl/CLEAN20GAS.png', desc: 'Promove a limpeza dos bicos injetores e válvulas, reduz o encrostamento e elimina resíduos da queima. Frasco de 200 ml.' },
			{ codigo: '0204', nome: 'FLEX', img: 'imagens/produtos/bardahl/BARDAHL FLEX.png', desc: 'Protege e limpa o sistema de injeção e ajuda a reduzir o consumo de combustível. Frasco de 200 ml.' },
			{ codigo: '0208', nome: 'MAX TOP', img: 'imagens/produtos/bardahl/MAXTOP.png' },
			{ codigo: '0209', nome: 'FUEL SPECIAL CLEANER 6X1', img:'imagens/produtos/bardahl/FUEL SPECIAL CLEANER 6 X 1.png' },
			{ codigo: '0210', nome: 'MAX HYBRID', img: 'imagens/produtos/bardahl/MAX20HYBRID.png' },
			{ codigo: '0205', nome: 'PROAL', img: 'imagens/produtos/bardahl/BARDAHL PROAL.png', desc: 'Limpa bicos e válvulas, remove a borra branca proveniente do etanol e contém inibidores de corrosão. Frasco de 200 ml.' },
			{ codigo: '0211', nome: 'MAX DIESEL', img: 'imagens/produtos/bardahl/MAX20DIESEL.png' },
			{ codigo: '0202', nome: 'MAX S10', img: 'imagens/produtos/bardahl/BARDAHL MAX S10.png', desc: 'Ação descarbonizante, antioxidante, bactericida e fungicida. Evita a formação de borra e aumenta a vida útil do diesel. Frasco de 500 ml.' },
			{ codigo: '0212', nome: 'MAX POWER DIESEL' }
		]
	},
	{
		id: 'motor',
		nome: 'Aditivo Motor',
		total: 5,
		items: [
			{ codigo: '0214', nome: 'B12 PREMIUM', img: 'imagens/produtos/bardahl/B122020Premium.png' },
			{ codigo: '0201', nome: 'B12 TURBO', img: 'imagens/produtos/bardahl/B122020TURBO.png', desc: 'Aumenta a vida útil do óleo e do motor e protege contra oxidação. Disponível em embalagens de 1 litro, 20 litros e 200 litros.' },
			{ codigo: '0215', nome: 'B12', img: 'imagens/produtos/bardahl/CONDICIONADOR.png' },
			{ codigo: '0216', nome: 'CONDICIONADOR DE METAIS', img: 'imagens/produtos/bardahl/B12.png' },
			{ codigo: '0217', nome: 'PROLONGA', img: 'imagens/produtos/bardahl/PROLONGA.png' }
		]
	},
	{
		id: 'radiador',
		nome: 'Aditivo Radiador',
		total: 3,
		items: [
			{ codigo: '0206', nome: 'RAD COOL LONG LIFE CONCENTRADO', img: 'imagens/produtos/bardahl/RAD20COOL.png', desc: "Oferece proteção anticorrosiva, evita a formação de bolhas, melhora a eficiência térmica e lubrifica a bomba d'água. Frasco de 1 litro." },
			{ codigo: '0218', nome: 'RAD COOL PRONTO USO', img: 'imagens/produtos/bardahl/RAD20COOL20PRONTO20PRA20USO201L.png' },
			{ codigo: '0219', nome: 'FLUIDO', img: 'imagens/produtos/bardahl/FLUIDO20ROSA201L.png' }
		]
	},
	{
		id: 'moto',
		nome: 'Lubrificante Moto',
		total: 2,
		items: [
			{ codigo: '0220', nome: 'MAXTEC 20W50', img: 'imagens/produtos/bardahl/MAXTEC20PERFORMANCE20MOTO2020W50.png' },
			{ codigo: '0221', nome: 'MAXTEC 10W30', img: 'imagens/produtos/bardahl/MAXTEC20PERFORMANCE20MOTO2010W30.png' }
		]
	}
];

const catTabs = document.getElementById('catTabs');
const catPanels = document.getElementById('catPanels');
const pad = (n) => String(n).padStart(2, '0');
let bardahlProductIndex = 22;
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

	lista.forEach((p) => {
		const card = document.createElement('article');
		card.className = 'product-card';
		const productNumber = p.codigo || `02${pad(bardahlProductIndex++)}`;
		card.innerHTML = `
			<div class="product-image bardahl-product-image" style="background-color:rgb(173,166,31);">
				${p.img ? `<img src="${p.img}" alt="${p.nome}">` : '<div class="ph" aria-hidden="true"></div>'}
				<span class="product-number">${productNumber}</span>
			</div>
			<div class="product-info"><div><p class="category">Bardahl</p><h3>${p.nome}</h3>
			<p class="product-description">${p.desc || ''}</p></div></div>`;
		addProductOrderControls(card);
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
