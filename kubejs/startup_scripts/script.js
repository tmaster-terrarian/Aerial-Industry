// priority: 0

onEvent('item.registry', event => {
	// Register new items here
	event.create('stone_pebble').displayName('Stone Pebble')
	event.create('andesite_pebble').displayName('Andesite Pebble')
	event.create('flint_chunk').displayName('Flint Chunk')

	event.create('wooden_spade', 'shovel').tier('wood').displayName('Wooden Spade')

	event.create('incomplete_magmatic_precursor', 'create:sequenced_assembly').displayName('Incomplete Magmatic Precursor')
	event.create('incomplete_copper_casing', 'create:sequenced_assembly').displayName('Incomplete Copper Casing')

	event.create('zinc_dust').texture("kubejs:item/zinc_dust").displayName('Zinc Dust').tagItem('forge:dusts/zinc').tagItem('forge:dusts')
})

onEvent('block.registry', event => {
	event.create('landfill')
  	.material('dirt')
    .hardness(0.5)
    .displayName('Landfill')
    .tagBlock('minecraft:mineable/shovel')

	event.create('black_sand', 'falling')
	.material('sand')
	.hardness(0.5)
	.resistance(0.5)
	.displayName('Blacksand')
	.tagBlock('minecraft:mineable/shovel')
    .tagBlock('forge:sand')

	event.create('magmatic_precursor')
	.material('stone')
	.hardness(1)
	.displayName('Magmatic Precursor')
	.tagBlock('minecraft:mineable/pickaxe')
})

onEvent('fluid.registry', event => {
	// Basic "thick" (looks like lava) fluid with red tint
	event.create('metal_slurry')
    .thickTexture(0x634248)
    .bucketColor(0x634248)
    .displayName('Metal Slurry')
	.temperature(400)
	.density(1500)
	.viscosity(1500)
})
