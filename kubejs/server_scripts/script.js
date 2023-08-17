// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('Loading Modpack Recipes...')

let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let CR = (id, x) => MOD("create", id, x)
let CR_CA = (id, x) => MOD("createaddition", id, x)
let CR_SR = (id, x) => MOD("railways", id, x)
let CR_ME = (id, x) => MOD("create_mechanical_extruder", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let WS = (id, x) => MOD("woodenshears", id, x)
let TE = (id, x) => MOD("thermal", id, x)
let TC = (id, x) => MOD("tconstruct", id, x)

onEvent('recipes', event => {
	// event.shapeless(KJ('plant_fiber'), ['#minecraft:leaves', Item.of(WS('wooden_shears')).ignoreNBT()]).damageIngredient(Item.of(WS('wooden_shears')).ignoreNBT())

	event.shaped(KJ('wooden_spade'), [
		'P',
		'S'
	], {
		P: '#minecraft:planks',
		S: 'minecraft:stick'
	})

	event.shaped(MC('cobblestone'), [
		'AA',
		'AA'
	], {
		A: 'kubejs:stone_pebble'
	})

	event.shaped(MC('flint'), [
		'AA',
		'AA'
	], {
		A: 'kubejs:flint_chunk'
	})

	event.shaped(MC('andesite'), [
		'AA',
		'AA'
	], {
		A: 'kubejs:andesite_pebble'
	})

	event.shaped('2x create:shaft', [
		'A',
		'A',
		'A'
	], {
		A: 'minecraft:andesite'
	})

	event.shaped(CR('hand_crank'), [
		'A  ',
		'PPP',
		'  A'
	], {
		A: 'minecraft:andesite',
		P: '#minecraft:planks'
	})

	event.shaped(CR('andesite_casing'), [
		' A ',
		'ALA',
		' A '
	], {
		A: 'minecraft:andesite',
		L: '#minecraft:logs'
	})

	event.recipes.createCompacting(Fluid.of(MC('water'), 100), ['#minecraft:leaves'])

	// event.recipes.createMilling(TE("rosin"), '#minecraft:logs')

	event.remove({ id: TE('rubber_from_vine') })
	event.remove({ id: TE('rubber_from_dandelion') })
	event.recipes.createMixing('1x ' + TE("rubber"), [Fluid.of(MC('water'), 1000), TE("rosin", 2)])

	event.remove({ id: CR('crafting/kinetics/belt_connector') })
	event.shaped(CR('belt_connector', 3), [
		'SSS',
		'SSS'
	], {
		S: TE('cured_rubber')
	})

	event.recipes.createMilling(Item.of(MC('sand')).withChance(0.25), MC('gravel'))

	event.custom({
		"type": "create:milling",
		"ingredients": [
			{
				"item": "minecraft:dirt"
			}
		],
		"results": [
			{
				"item": "minecraft:dirt",
				"chance": 0.95
			},
			{
				"item": "kubejs:andesite_pebble",
				"chance": 0.5
			},
			{
				"item": "kubejs:stone_pebble",
				"chance": 0.5
			},
			{
				"item": "kubejs:flint_chunk",
				"chance": 0.5
			}
		],
		"processingTime": 100
	})
	event.custom({
		"type": "create:milling",
		"ingredients": [
			{
				"tag": "minecraft:logs"
			}
		],
		"results": [
			{
				"item": "thermal:rosin",
				"chance": 0.5
			}
		],
		"processingTime": 100
	})

	event.recipes.createMixing(MC("dirt"), [Fluid.of(MC('water'), 250), MC("gravel"), MC("#leaves", 4)])

	event.recipes.createMixing(MC("prismarine_shard"), [Fluid.of(MC('water'), 250), MC("flint")])
	event.custom({
		"type": "create:milling",
		"ingredients": [
			{
				"item": "minecraft:prismarine"
			}
		],
		"results": [
			{
				"item": "create:copper_nugget"
			},
			{
				"item": "minecraft:flint",
				"count": 8
			}
		],
		"processingTime": 100
	})

	event.remove({ id: MC('prismarine') })
	event.remove({ id: MC('prismarine_bricks') })
	event.shaped(MC('prismarine'), [
		'SSS',
		'SSS',
		'SSS'
	], {
		S: MC('prismarine_shard')
	})
	event.shaped(MC('prismarine_bricks', 4), [
		'SS',
		'SS'
	], {
		S: MC('prismarine')
	})

	event.recipes.createMixing(Fluid.of(TC('slime'), 250), [Fluid.of(MC('water'), 250), MC("slime_ball")])

	let transitional = 'kubejs:incomplete_magmatic_precursor'
	event.recipes.createSequencedAssembly([
		'kubejs:magmatic_precursor',
	], 'minecraft:cobblestone', [
		event.recipes.createFilling(transitional, [transitional, Fluid.of(TE('crude_oil'), 100)]),
		event.recipes.createPressing(transitional, transitional)
	]).transitionalItem(transitional).loops(20).id('kubejs:magmatic_precursor')

	event.smelting(MC('magma_block'), KJ('magmatic_precursor'))
	event.blasting(MC('magma_block'), KJ('magmatic_precursor'))

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": {
		  	"item": "minecraft:coal"
		},
		"result": {
			"fluid": "thermal:crude_oil",
			"amount": 100
		},
		"temperature": 800,
		"time": 79
	})

	event.recipes.createCompacting(MC('coal'), MC('charcoal', 2))

	// event.recipes.createMilling(CR('powdered_obsidian'), MC('obsidian'))

	event.remove({ output: CR('copper_casing') })
	event.shaped(CR('copper_casing'), [
		'SRS',
		'RLR',
		'SRS'
	], {
		S: CR('copper_sheet'),
		R: TE('cured_rubber'),
		L: CR('andesite_casing')
	})

	transitional = 'kubejs:incomplete_copper_casing'
	event.recipes.createSequencedAssembly([
		CR('copper_casing'),
	], CR('andesite_casing'), [
		event.recipes.createDeploying(transitional, [transitional, TE('cured_rubber')]),
		event.recipes.createDeploying(transitional, [transitional, CR('copper_sheet')])
	]).transitionalItem(transitional).loops(2).id(CR('copper_casing'))

	transitional = 'minecraft:terracotta'
	event.recipes.createSequencedAssembly([
		MC('dripstone_block'),
	], MC('terracotta'), [
		event.recipes.createFilling(transitional, [transitional, Fluid.of(MC('water'), 1000)]),
		event.recipes.createCutting(transitional, transitional),
		event.recipes.createPressing(transitional, transitional)
	]).transitionalItem(transitional).loops(1).id(MC('dripstone_block'))

	event.recipes.createCompacting([Fluid.of(MC('lava'), 250), MC('cobblestone')], MC('magma_block'))

	event.remove({ id: TC('common/flint') })
	event.remove({ id: CR('crafting/logistics/andesite_funnel') })
	event.shaped(CR('andesite_funnel'), [
		'S',
		'R'
	], {
		S: CR('andesite_alloy'),
		R: TE('cured_rubber')
	})
	event.remove({ id: CR('crafting/logistics/brass_funnel') })
	event.shaped(CR('brass_funnel'), [
		'T',
		'S',
		'R'
	], {
		T: CR('electron_tube'),
		S: CR('brass_ingot'),
		R: TE('cured_rubber')
	})
	
	event.remove({ id: CR('crafting/logistics/andesite_tunnel') })
	event.shaped(CR('andesite_tunnel'), [
		'SS',
		'RR'
	], {
		S: CR('andesite_alloy'),
		R: TE('cured_rubber')
	})
	event.remove({ id: CR('crafting/logistics/brass_tunnel') })
	event.shaped(CR('brass_tunnel'), [
		'T ',
		'SS',
		'RR'
	], {
		T: CR('electron_tube'),
		S: CR('brass_ingot'),
		R: TE('cured_rubber')
	})

	event.remove({ id: CR('milling/gravel') })
})

onEvent('item.tags', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')
})
