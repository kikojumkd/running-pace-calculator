<svelte:head>
	<title>Meal Prep — Pacen</title>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
	{@html `<style>
		.mp-theme {
			--mp-bg: #f8f7f4; --mp-text: #1a1a1a; --mp-card: #ffffff;
			--mp-border: #e8e5df; --mp-muted: #8a8580;
			--mp-accent: #2d6a4f; --mp-accent-light: #d8f3dc;
			--mp-easy: #d4edda; --mp-easy-t: #155724;
			--mp-med: #fff3cd; --mp-med-t: #856404;
			color: var(--mp-text);
		}
		@media (prefers-color-scheme: dark) {
			.mp-theme {
				--mp-bg: #121210; --mp-text: #e8e5df; --mp-card: #1e1e1c;
				--mp-border: #333330; --mp-muted: #8a8580;
				--mp-accent: #52b788; --mp-accent-light: #1b3a2a;
				--mp-easy: #1b3a2a; --mp-easy-t: #95d5b2;
				--mp-med: #3d3520; --mp-med-t: #f0c040;
			}
		}
		.mp-container { max-width: 640px; margin: 0 auto; padding: 0 20px 60px; font-family: 'DM Sans', 'Segoe UI', sans-serif; }
		.mp-header { padding: 28px 0 0; }
		.mp-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: var(--mp-accent); text-transform: uppercase; margin-bottom: 6px; }
		.mp-title { font-family: 'DM Serif Display', serif; font-size: 28px; font-weight: 400; line-height: 1.2; margin-bottom: 4px; }
		.mp-subtitle { color: var(--mp-muted); font-size: 14px; margin-bottom: 20px; }
		.mp-tabs { display: flex; border-bottom: 1px solid var(--mp-border); margin-bottom: 20px; gap: 0; }
		.mp-tab-btn { padding: 10px 18px; border: none; background: transparent; color: var(--mp-muted); cursor: pointer; font-size: 14px; font-weight: 600; border-bottom: 2px solid transparent; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
		.mp-tab-btn.active { color: var(--mp-accent); border-bottom-color: var(--mp-accent); }
		.mp-tab-btn:hover { color: var(--mp-text); }
		.mp-card { background: var(--mp-card); border: 1px solid var(--mp-border); border-radius: 12px; padding: 20px; margin-bottom: 12px; transition: box-shadow 0.2s; }
		.mp-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
		.mp-cat-header { display: flex; align-items: center; justify-content: space-between; cursor: pointer; padding: 4px 0; user-select: none; background: none; border: none; width: 100%; color: inherit; font-family: inherit; text-align: left; }
		.mp-cat-left { display: flex; align-items: center; gap: 10px; }
		.mp-cat-emoji { font-size: 22px; }
		.mp-cat-name { font-weight: 600; font-size: 15px; }
		.mp-cat-sub { font-size: 12px; color: var(--mp-muted); }
		.mp-cat-arrow { font-size: 18px; color: var(--mp-muted); transition: transform 0.2s; }
		.mp-cat-arrow.open { transform: rotate(180deg); }
		.mp-cat-items { margin-top: 12px; }
		.mp-check-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--mp-border); cursor: pointer; transition: opacity 0.2s; background: none; border-left: none; border-right: none; border-top: none; width: 100%; color: inherit; font-family: inherit; text-align: left; }
		.mp-check-item:last-child { border-bottom: none; }
		.mp-check-item.checked { opacity: 0.4; }
		.mp-checkbox { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--mp-border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; margin-top: 2px; }
		.mp-checkbox.on { background: var(--mp-accent); border-color: var(--mp-accent); }
		.mp-checkbox.on::after { content: '✓'; color: #fff; font-size: 14px; font-weight: 700; }
		.mp-item-info { flex: 1; min-width: 0; }
		.mp-item-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
		.mp-item-name { font-weight: 600; font-size: 14px; }
		.mp-item-name.struck { text-decoration: line-through; }
		.mp-item-qty { font-weight: 700; font-size: 13px; color: var(--mp-accent); background: var(--mp-accent-light); padding: 2px 8px; border-radius: 6px; white-space: nowrap; flex-shrink: 0; }
		.mp-item-tip { font-size: 12px; color: var(--mp-muted); margin-top: 4px; }
		.mp-item-recipes { font-size: 11px; color: var(--mp-muted); margin-top: 4px; }
		.mp-progress-wrap { margin-bottom: 16px; }
		.mp-progress-top { display: flex; justify-content: space-between; font-size: 13px; color: var(--mp-muted); }
		.mp-progress-count { font-weight: 600; color: var(--mp-accent); }
		.mp-progress-bar { height: 6px; background: var(--mp-border); border-radius: 3px; overflow: hidden; margin-top: 8px; }
		.mp-progress-fill { height: 100%; background: var(--mp-accent); border-radius: 3px; transition: width 0.4s ease; }
		.mp-meal-section { margin-bottom: 24px; }
		.mp-meal-section-title { font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 400; margin-bottom: 12px; }
		.mp-meal-card { background: var(--mp-card); border: 1px solid var(--mp-border); border-radius: 12px; padding: 16px; margin-bottom: 10px; }
		.mp-meal-name { font-weight: 600; font-size: 15px; margin-bottom: 8px; }
		.mp-badges { display: flex; flex-wrap: wrap; gap: 6px; }
		.mp-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
		.mp-badge-time { background: var(--mp-accent-light); color: var(--mp-accent); }
		.mp-badge-easy { background: var(--mp-easy); color: var(--mp-easy-t); }
		.mp-badge-med { background: var(--mp-med); color: var(--mp-med-t); }
		.mp-badge-method { background: var(--mp-border); color: var(--mp-text); }
		.mp-prep-card .mp-prep-row { display: flex; gap: 14px; align-items: flex-start; }
		.mp-step-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; background: var(--mp-accent-light); }
		.mp-step-content { flex: 1; }
		.mp-step-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: var(--mp-accent); text-transform: uppercase; margin-bottom: 2px; }
		.mp-step-title { font-weight: 600; font-size: 16px; margin-bottom: 10px; }
		.mp-task { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; line-height: 1.5; margin-bottom: 6px; }
		.mp-task-arrow { color: var(--mp-accent); font-weight: 700; flex-shrink: 0; }
		.mp-tips-card { background: var(--mp-accent-light); border: 1px solid var(--mp-accent); }
		.mp-tips-title { font-weight: 700; font-size: 14px; margin-bottom: 8px; color: var(--mp-accent); }
		.mp-tips-body { font-size: 13px; line-height: 1.7; }
		.mp-tips-body div { margin-bottom: 6px; }
		.mp-prep-intro { margin-bottom: 20px; }
		.mp-prep-intro h2 { font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 400; margin-bottom: 6px; }
		.mp-prep-intro p { font-size: 13px; color: var(--mp-muted); line-height: 1.5; }
	</style>`}
</svelte:head>

<script lang="ts">
	import { browser } from '$app/environment';

	interface ShoppingItem {
		name: string;
		total: string;
		recipes: string[];
		tip: string;
	}

	interface Category {
		emoji: string;
		items: ShoppingItem[];
	}

	interface Meal {
		name: string;
		time: string;
		diff: string;
		method: string;
	}

	interface MealSection {
		emoji: string;
		meals: Meal[];
	}

	interface PrepStep {
		day: string;
		icon: string;
		title: string;
		tasks: string[];
	}

	const DATA: Record<string, Category> = {
		"Протеини / Месо / Јајца": { emoji: "🥩", items: [
			{ name: "Пилешки гради", total: "550g", recipes: ["Салата со пилешко и киноа (150g)", "Тестенини со пилешко и песто (150g)", "Печена тава со пилешко и зеленчук (150g)", "Тост со пилешко и авокадо (100g)"], tip: "Купи ~600g. Свежо е подобро, замрзни го вишокот." },
			{ name: "Мелено говедско месо", total: "450g", recipes: ["Ориз со мелено месо (150g)", "Чили со мелено месо (150g)", "Полнети тиквички (150g)"], tip: "Купи ~500g. Бирај нискомаслено (5-10% масти)." },
			{ name: "Мисиркино месо", total: "150g", recipes: ["Печено мисиркино месо со слатки компири (150g)"], tip: "Купи ~200g. Одличен извор на протеини." },
			{ name: "Јајца", total: "12 парчиња", recipes: ["Омлет со зеленчук и сирење (4)", "Протеински палачинки (2)", "Тост со авокадо и јајца (2)", "Омлет со сирење и салата (4)"], tip: "Купи пакување од 12. Чувај ги во фрижидер." },
			{ name: "Протеин во прав", total: "70g", recipes: ["Шејк со овес (40g)", "Протеински палачинки (30g)"], tip: "Whey протеин. Провери дали имаш доволно." },
		]},
		"Млечни производи": { emoji: "🧀", items: [
			{ name: "Грчки јогурт (низок % масти)", total: "200g", recipes: ["Овес со јогурт и бобинки (200g)"], tip: "Купи 1 пакување од 200g или 400g." },
			{ name: "Рендано сирење (нискомаслено)", total: "90g", recipes: ["Омлет со зеленчук (30g)", "Полнети тиквички (30g)", "Омлет со сирење и салата (30g)"], tip: "Купи 1 пакување (~150g). Бирај нискомаслено." },
			{ name: "Бадемово млеко", total: "300ml", recipes: ["Шејк со овес (300ml)"], tip: "Купи 1L, користи го за шејкови цела недела." },
		]},
		"Зеленчук": { emoji: "🥦", items: [
			{ name: "Тиквички", total: "~350g (4-5 мали)", recipes: ["Омлет со зеленчук (50g)", "Печено мисиркино (100g)", "Полнети тиквички (2 мали)"], tip: "Купи 4-5 мали тиквички." },
			{ name: "Брокула", total: "200g", recipes: ["Ориз со мелено месо (100g)", "Печена тава со пилешко (100g)"], tip: "1 средна глава е доволна." },
			{ name: "Моркови", total: "200g", recipes: ["Печена тава со пилешко (100g)", "Леќа со зеленчук (100g)"], tip: "Купи 3-4 моркови." },
			{ name: "Спанаќ", total: "50g", recipes: ["Омлет со зеленчук (50g)"], tip: "Пакување свеж или замрзнат спанаќ." },
			{ name: "Мешана салата", total: "100g", recipes: ["Салата со пилешко и киноа (100g)"], tip: "Готова мешана салата од маркет." },
			{ name: "Зелена салата", total: "50g", recipes: ["Омлет со сирење и салата (50g)"], tip: "Купи 1 глава." },
			{ name: "Кромид", total: "50g", recipes: ["Леќа со зеленчук (50g)"], tip: "Купи 1-2 кромиди." },
			{ name: "Слатки компири", total: "200g", recipes: ["Печено мисиркино со слатки компири (200g)"], tip: "Купи 1-2 средни слатки компири." },
			{ name: "Авокадо", total: "1 парче", recipes: ["Тост со авокадо и јајца (1/2)", "Тост со пилешко и авокадо (1/2)"], tip: "Купи 1 авокадо. Зрело но не премеко." },
		]},
		"Житарици и тестенини": { emoji: "🌾", items: [
			{ name: "Овесни снегулки", total: "110g", recipes: ["Шејк со овес (50g)", "Овес со јогурт (60g)"], tip: "Купи 500g пакување. Ќе ти трае долго." },
			{ name: "Овесно брашно", total: "50g", recipes: ["Протеински палачинки (50g)"], tip: "Или блендирај овесни снегулки во брашно." },
			{ name: "Интегрален ориз", total: "60g", recipes: ["Ориз со мелено месо (60g)"], tip: "Купи 500g пакување." },
			{ name: "Интегрални тестенини", total: "80g", recipes: ["Тестенини со пилешко и песто (80g)"], tip: "Купи 500g пакување." },
			{ name: "Интегрален леб", total: "4 парчиња", recipes: ["Тост со авокадо (2 парч.)", "Тост со пилешко (2 парч.)"], tip: "Купи 1 леб. Замрзни ако нема да го јадеш набрзо." },
			{ name: "Киноа", total: "60g", recipes: ["Салата со пилешко и киноа (60g)"], tip: "Купи мало пакување (~250g)." },
			{ name: "Леќа", total: "80g", recipes: ["Леќа со зеленчук (80g)"], tip: "Купи 500g пакување. Трае долго." },
			{ name: "Црвен грав", total: "50g", recipes: ["Чили со мелено месо (50g)"], tip: "Конзервиран е најлесно." },
		]},
		"Масла, сосови и зачини": { emoji: "🫒", items: [
			{ name: "Маслиново масло", total: "~5 лажички", recipes: ["Омлет со зеленчук (1)", "Салата со пилешко (1)", "Печено мисиркино (1)", "Печена тава (1)", "Леќа со зеленчук (1)"], tip: "Купи 500ml шише. Extra virgin." },
			{ name: "Путер од кикирики", total: "15g", recipes: ["Шејк со овес (15g)"], tip: "Купи тегла (~300g). Без додаден шеќер." },
			{ name: "Мед", total: "~2-3 лажички", recipes: ["Овес со јогурт (1)", "Протеински палачинки (1)"], tip: "Купи мала тегла (~250g)." },
			{ name: "Песто сос", total: "1 лажица", recipes: ["Тестенини со пилешко и песто (1 лаж.)"], tip: "Купи мала тегла. Чувај во фрижидер." },
			{ name: "Доматен сос", total: "100g", recipes: ["Чили со мелено месо (50g)", "Полнети тиквички (50g)"], tip: "Купи тегла или пасиран домат." },
			{ name: "Лимонов сок", total: "1 лажица", recipes: ["Салата со пилешко и киноа (1 лаж.)"], tip: "Купи 1 лимон." },
			{ name: "Чили во прав", total: "1/2 лажичка", recipes: ["Чили со мелено месо"], tip: "Мало пакување зачин." },
		]},
		"Овошје": { emoji: "🍌", items: [
			{ name: "Банана", total: "1 парче", recipes: ["Шејк со овес (1)"], tip: "Купи 2-3, користи ги за шејкови цела недела." },
			{ name: "Свежи бобинки", total: "50g", recipes: ["Овес со јогурт и бобинки (50g)"], tip: "Малини, боровинки или јагоди. Замрзнати исто работат." },
		]},
	};

	const MEALS: Record<string, MealSection> = {
		"Појадоци": { emoji: "🌅", meals: [
			{ name: "Шејк со овес, путер од кикирики и банана", time: "3 мин", diff: "Лесно", method: "Блендер" },
			{ name: "Омлет со зеленчук и сирење", time: "10 мин", diff: "Лесно", method: "Тава" },
			{ name: "Овес со јогурт и бобинки", time: "2 мин", diff: "Лесно", method: "Без готвење" },
			{ name: "Протеински палачинки со мед", time: "10 мин", diff: "Лесно", method: "Тава" },
			{ name: "Тост со авокадо и јајца", time: "10 мин", diff: "Лесно", method: "Тостер + вриење" },
		]},
		"Ручеци": { emoji: "☀️", meals: [
			{ name: "Салата со пилешко и киноа", time: "20 мин", diff: "Средно", method: "Варење + мешање" },
			{ name: "Печено мисиркино со слатки компири", time: "30 мин", diff: "Средно", method: "Рерна 200°C" },
			{ name: "Ориз со мелено месо и зеленчук", time: "25 мин", diff: "Средно", method: "Варење + тава" },
			{ name: "Тестенини со пилешко и песто", time: "15 мин", diff: "Лесно", method: "Варење" },
			{ name: "Чили со мелено месо и црвен грав", time: "15 мин", diff: "Средно", method: "Тава" },
		]},
		"Вечери": { emoji: "🌙", meals: [
			{ name: "Полнети тиквички со мелено месо", time: "30 мин", diff: "Средно", method: "Рерна 180°C" },
			{ name: "Печена тава со пилешко и зеленчук", time: "30 мин", diff: "Средно", method: "Рерна 200°C" },
			{ name: "Омлет со сирење и салата", time: "10 мин", diff: "Лесно", method: "Тава" },
			{ name: "Леќа со зеленчук и маслиново масло", time: "25 мин", diff: "Средно", method: "Варење" },
			{ name: "Тост со пилешко и авокадо", time: "5 мин", diff: "Лесно", method: "Без готвење" },
		]},
	};

	const PREP: PrepStep[] = [
		{ day: "Недела", icon: "🛒", title: "Набавка", tasks: ["Оди во маркет со листата подолу", "Купи ги сите состојки по категории", "Замрзни го пилешкото и мисиркиното месо во порции од 150g"] },
		{ day: "Недела", icon: "🔪", title: "Подготовка (Batch Prep)", tasks: ["Свари ја киноата (60g суво = ~180g варено). Стави во фрижидер.", "Свари го оризот (60g суво). Стави во фрижидер.", "Свари ја леќата (80g суво). Стави во фрижидер.", "Исечи ги тиквичките, морковите и брокулата", "Свари 2 јајца за тостот со авокадо", "Подготви ги овесните снегулки во тегли за шејк и јогурт"] },
		{ day: "Преку неделата", icon: "⚡", title: "Брзи оброци (под 10 мин)", tasks: ["Шејк со овес: блендирај и готово (3 мин)", "Овес со јогурт: измешај во сад (2 мин)", "Тост со авокадо: намачкај и сервирај (5 мин)", "Тост со пилешко: сервирај (5 мин)", "Омлети: испржи на тава (10 мин)"] },
		{ day: "Преку неделата", icon: "🍳", title: "Оброци за готвење (15-30 мин)", tasks: ["Печени оброци (рерна): подготви состојки, стави во рерна", "Тестенини со песто: свари, измешај", "Чили: испржи месо, додај грав и сос", "Полнети тиквички: наполни, стави во рерна"] },
	];

	let activeTab = $state<'shopping' | 'meals' | 'prep'>('shopping');
	let checked = $state<Record<string, boolean>>(
		browser ? JSON.parse(localStorage.getItem('mealPrepChecked') || '{}') : {}
	);
	let openCats = $state<Record<string, boolean>>({});

	const totalItems = $derived(
		Object.values(DATA).reduce((sum, cat) => sum + cat.items.length, 0)
	);

	const checkedCount = $derived(
		Object.values(checked).filter(Boolean).length
	);

	const progressPercent = $derived(
		totalItems ? (checkedCount / totalItems) * 100 : 0
	);

	$effect(() => {
		if (browser) {
			localStorage.setItem('mealPrepChecked', JSON.stringify(checked));
		}
	});

	function toggleItem(key: string) {
		checked[key] = !checked[key];
	}

	function toggleCat(cat: string) {
		openCats[cat] = !openCats[cat];
	}
</script>

<div class="mp-container mp-theme">
	<div class="mp-header">
		<div class="mp-label">Muscle Gain / Fat Loss</div>
		<h1 class="mp-title">Meal Prep Planner</h1>
		<p class="mp-subtitle">15 рецепти · Оптимизирана набавка · План за подготовка</p>

		{#if activeTab === 'shopping'}
			<div class="mp-progress-wrap">
				<div class="mp-progress-top">
					<span>Набавка</span>
					<span class="mp-progress-count">{checkedCount}/{totalItems}</span>
				</div>
				<div class="mp-progress-bar">
					<div class="mp-progress-fill" style="width: {progressPercent}%"></div>
				</div>
			</div>
		{/if}

		<div class="mp-tabs">
			<button class="mp-tab-btn" class:active={activeTab === 'shopping'} onclick={() => activeTab = 'shopping'}>🛒 Листа</button>
			<button class="mp-tab-btn" class:active={activeTab === 'meals'} onclick={() => activeTab = 'meals'}>🍽️ Оброци</button>
			<button class="mp-tab-btn" class:active={activeTab === 'prep'} onclick={() => activeTab = 'prep'}>📋 План</button>
		</div>
	</div>

	{#if activeTab === 'shopping'}
		{#each Object.entries(DATA) as [catName, cat]}
			{@const catChecked = cat.items.filter((_, i) => checked[`${catName}-${i}`]).length}
			{@const isOpen = !!openCats[catName]}
			<div class="mp-card">
				<button class="mp-cat-header" onclick={() => toggleCat(catName)}>
					<div class="mp-cat-left">
						<span class="mp-cat-emoji">{cat.emoji}</span>
						<div>
							<div class="mp-cat-name">{catName}</div>
							<div class="mp-cat-sub">{cat.items.length} производи · {catChecked} купено</div>
						</div>
					</div>
					<span class="mp-cat-arrow" class:open={isOpen}>▾</span>
				</button>
				{#if isOpen}
					<div class="mp-cat-items">
						{#each cat.items as item, i}
							{@const key = `${catName}-${i}`}
							{@const on = !!checked[key]}
							<button class="mp-check-item" class:checked={on} onclick={() => toggleItem(key)}>
								<div class="mp-checkbox" class:on></div>
								<div class="mp-item-info">
									<div class="mp-item-top">
										<span class="mp-item-name" class:struck={on}>{item.name}</span>
										<span class="mp-item-qty">{item.total}</span>
									</div>
									<div class="mp-item-tip">💡 {item.tip}</div>
									<div class="mp-item-recipes">За: {item.recipes.join(' · ')}</div>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	{:else if activeTab === 'meals'}
		{#each Object.entries(MEALS) as [type, data]}
			<div class="mp-meal-section">
				<div class="mp-meal-section-title">{data.emoji} {type}</div>
				{#each data.meals as meal, i}
					<div class="mp-meal-card">
						<div class="mp-meal-name">{i + 1}. {meal.name}</div>
						<div class="mp-badges">
							<span class="mp-badge mp-badge-time">⏱ {meal.time}</span>
							<span class="mp-badge" class:mp-badge-easy={meal.diff === 'Лесно'} class:mp-badge-med={meal.diff !== 'Лесно'}>{meal.diff}</span>
							<span class="mp-badge mp-badge-method">{meal.method}</span>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	{:else}
		<div class="mp-prep-intro">
			<h2>Неделен план за подготовка</h2>
			<p>Со 1-2 часа подготовка во недела, секој оброк преку неделата ќе ти биде готов за 5-15 минути.</p>
		</div>
		{#each PREP as step}
			<div class="mp-card mp-prep-card">
				<div class="mp-prep-row">
					<div class="mp-step-icon">{step.icon}</div>
					<div class="mp-step-content">
						<div class="mp-step-label">{step.day}</div>
						<div class="mp-step-title">{step.title}</div>
						{#each step.tasks as task}
							<div class="mp-task"><span class="mp-task-arrow">→</span><span>{task}</span></div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
		<div class="mp-card mp-tips-card">
			<div class="mp-tips-title">💪 Про совети</div>
			<div class="mp-tips-body">
				<div>→ <strong>Замрзнување:</strong> Пилешкото и мисиркиното ги подели во порции од 150g пред да ги замрзнеш.</div>
				<div>→ <strong>Варени јајца:</strong> Свари 4-6 одеднаш, трајат 5 дена во фрижидер.</div>
				<div>→ <strong>Ориз/Киноа/Леќа:</strong> Свари ги одеднаш во недела. Стави во контејнери во фрижидер.</div>
				<div>→ <strong>Овесни тегли:</strong> Подготви 2-3 тегли со овес + јогурт + бобинки за наредните денови.</div>
			</div>
		</div>
	{/if}
</div>

