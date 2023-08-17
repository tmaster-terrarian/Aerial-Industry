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
	}).id('kubejs:crafting/wooden_spade_manual_only')

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
	}).id('kubejs:crafting/shaft_manual_only')

	event.shaped(CR('hand_crank'), [
		'A  ',
		'PPP',
		'  A'
	], {
		A: 'minecraft:andesite',
		P: '#minecraft:planks'
	}).id('kubejs:crafting/hand_crank_manual_only')

	event.shaped(CR('andesite_casing'), [
		' A ',
		'ALA',
		' A '
	], {
		A: 'minecraft:andesite',
		L: '#minecraft:logs'
	}).id('kubejs:crafting/andesite_casing_manual_only')

	event.recipes.createCompacting(Fluid.of(MC('water'), 100), ['#minecraft:leaves'])

	// event.recipes.createMilling(TE("rosin"), '#minecraft:logs')

	event.remove({ id: TE('rubber_from_vine') })
	event.remove({ id: TE('rubber_from_dandelion') })
	// event.remove({ id: TE('rubber_3') })
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

	event.recipes.createMixing(MC("dirt"), [Fluid.of(MC('water'), 250), MC("gravel"), MC("wheat", 1)])

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

	// magmatic precursor sequenced assembly
	let transitional = 'kubejs:incomplete_magmatic_precursor'
	event.recipes.createSequencedAssembly([
		'kubejs:magmatic_precursor',
	], 'minecraft:cobblestone', [
		event.recipes.createFilling(transitional, [transitional, Fluid.of(TE('crude_oil'), 100)]),
		event.recipes.createPressing(transitional, transitional)
	]).transitionalItem(transitional).loops(20).id('kubejs:magmatic_precursor')

	event.smelting(MC('magma_block'), KJ('magmatic_precursor')).xp(0)
	event.blasting(MC('magma_block'), KJ('magmatic_precursor')).xp(0)

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
	}).id('kubejs:crafting/copper_casing_manual_only')

	// copper casing sequenced assembly
	transitional = 'kubejs:incomplete_copper_casing'
	event.recipes.createSequencedAssembly([
		CR('copper_casing'),
	], CR('andesite_casing'), [
		event.recipes.createDeploying(transitional, [transitional, TE('cured_rubber')]),
		event.recipes.createDeploying(transitional, [transitional, CR('copper_sheet')])
	]).transitionalItem(transitional).loops(2).id(CR('copper_casing'))

	// dripstone sequenced assembly
	transitional = 'minecraft:terracotta'
	event.recipes.createSequencedAssembly([
		MC('dripstone_block'),
	], MC('terracotta'), [
		event.recipes.createFilling(transitional, [transitional, Fluid.of(MC('water'), 1000)]),
		event.recipes.createCutting(transitional, transitional),
		event.recipes.createPressing(transitional, transitional)
	]).transitionalItem(transitional).loops(1).id(MC('dripstone_block'))

	// pointed dripstone sequenced assembly
	transitional = MC('dripstone_block')
	event.recipes.createSequencedAssembly([
		MC('pointed_dripstone', 4),
	], MC('dripstone_block'), [
		event.recipes.createCutting(transitional, transitional),
		event.recipes.createCutting(transitional, transitional)
	]).transitionalItem(transitional).loops(1).id(MC('pointed_dripstone'))

	event.recipes.createCompacting([Fluid.of(MC('lava'), 250), MC('cobblestone')], MC('magma_block'))

	event.remove({ id: TC('common/flint') })
	event.remove({ id: CR('milling/gravel') })

	event.replaceInput({ mod: 'create' }, MC('dried_kelp'), TE('cured_rubber'))

	event.replaceInput({}, '#forge:plates/iron', CR('iron_sheet'))
	event.replaceInput({}, '#forge:plates/gold', CR('golden_sheet'))
	event.replaceInput({}, '#forge:dusts/gold', TE('gold_dust'))
	event.replaceInput({}, '#forge:dusts/iron', TE('iron_dust'))
	event.replaceInput({}, '#forge:dusts/copper', TE('copper_dust'))
	event.replaceInput({}, '#forge:plates/copper', CR('copper_sheet'))
	event.replaceInput({}, '#forge:nuggets/copper', CR('copper_nugget'))
	event.replaceOutput({}, '#forge:nuggets/copper', CR('copper_nugget'))
	event.replaceOutput({}, '#forge:nuggets/silver', TE('silver_nugget'))
	event.replaceOutput({}, '#forge:ingots/silver', TE('silver_ingot'))
	event.replaceOutput({}, '#forge:storage_blocks/silver', TE('silver_block'))
	event.replaceInput({}, '#forge:storage_blocks/copper', CR('copper_block'))
	event.replaceOutput({}, '#forge:storage_blocks/copper', CR('copper_block'))
	event.replaceInput({}, '#forge:nuggets/netherite', TC('netherite_nugget'))
	event.replaceOutput({}, '#forge:nuggets/netherite', TC('netherite_nugget'))

	event.remove({ id: TE('storage/netherite_nugget_from_ingot') })

	event.remove({ id: CR('crushing/ochrum') })
	event.remove({ id: CR('crushing/ochrum_recycling') })
	event.remove({ id: CR('crushing/crimsite') })
	event.remove({ id: CR('crushing/crimsite_recycling') })
	event.remove({ id: CR('crushing/veridium') })
	event.remove({ id: CR('crushing/veridium_recycling') })
	event.remove({ id: CR('crushing/asurine') })
	event.remove({ id: CR('crushing/asurine_recycling') })
	event.remove({ id: CR('crushing/diorite') })
	event.remove({ id: CR('crushing/diorite_recycling') })

	event.recipes.createCrushing(CR('crushed_raw_gold'), CR('#stone_types/ochrum'))
	event.recipes.createCrushing(CR('crushed_raw_iron'), CR('#stone_types/crimsite'))
	event.recipes.createCrushing(CR('crushed_raw_copper'), CR('#stone_types/veridium'))
	event.recipes.createCrushing(CR('crushed_raw_zinc'), CR('#stone_types/asurine'))
	event.recipes.createCrushing(MC('quartz'), CR('#stone_types/diorite'))
})

onEvent('item.tags', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')
})
