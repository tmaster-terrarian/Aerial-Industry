// priority: 0

onEvent('item.registry', event => {
	// Register new items here
	event.create('stone_pebble').displayName('Stone Pebble')
	event.create('andesite_pebble').displayName('Andesite Pebble')
	event.create('flint_chunk').displayName('Flint Chunk')

	event.create('wooden_spade', 'shovel').tier('wood').displayName('Wooden Spade')

	event.create('incomplete_magmatic_precursor', 'create:sequenced_assembly').displayName('Incomplete Magmatic Precursor')
	event.create('incomplete_copper_casing', 'create:sequenced_assembly').displayName('Incomplete Copper Casing')
})

onEvent('block.registry', event => {
	// Register new blocks here

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
