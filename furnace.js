var furnaceSaves = [];
var furnaceInventoryPrefab=[new inventorySpace(156, 80), 
			 new inventorySpace(156, 131),
			 new inventorySpace(268, 107)];

var furnace = copyArr(furnaceInventoryPrefab);

var furnaceRecipes=[[items[2], items[54]], [items[1], items[0]], [items[7], items[55]], [items[10], items[56]]]

var smeltingTime=998;

var furnaceSmeltingProgress;
var furnaceFuelProgress;

function checkForFurnaceSmelting() {
	if(playing != 2) {
		for(var a of furnaceSaves) { 	
			if(furnaceSaves[furnaceSaves.indexOf(a)].fuel != 0) {
				furnaceSaves[furnaceSaves.indexOf(a)].fuel--;
				furnaceArrowUI.percent=100*(a.smelting/smeltingTime)
				furnaceFireUI.percent = Math.round((furnaceSaves[furnaceSaves.indexOf(a)].fuel/a.maxFuel)*10)*10;
			}
			for(var c of furnaceRecipes){
				if(a.inventory[0].item == c[0]){
					if(furnaceSaves[furnaceSaves.indexOf(a)].fuel != 0) {
						if(a.inventory[2].item==undefined && a.inventory[0].item == c[0] || a.inventory[2].item==c[1] && a.inventory[0].item == c[0]) {
							furnaceSaves[furnaceSaves.indexOf(a)].smelting++;	
						}
						if(a.smelting>=smeltingTime && a.inventory[0].item == c[0]) {
							furnaceSaves[furnaceSaves.indexOf(a)].smelting=0;
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[2].count++;	
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].count--;	
							if(furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].count == 0) {
								furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].item=undefined;
								furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].reRender();	
							}
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[2].item=c[1];
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[2].reRender();
						}
						if(furnaceSaves[furnaceSaves.indexOf(a)].active) {
							furnaceFireUI.percent = Math.round((furnaceSaves[furnaceSaves.indexOf(a)].fuel/a.maxFuel)*10)*10;
						}
					}
					if(a.inventory[0].item == c[0] && a.inventory[1].item != undefined && a.inventory[1].item.smelting != undefined && furnaceSaves[furnaceSaves.indexOf(a)].fuel == 0) {
						furnaceSaves[furnaceSaves.indexOf(a)].fuel = a.inventory[1].item.smelting;
						furnaceSaves[furnaceSaves.indexOf(a)].maxFuel = a.inventory[1].item.smelting;
						furnaceSaves[furnaceSaves.indexOf(a)].inventory[1].count--;
						if(a.inventory[1].count==0) {
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[1].item = undefined;
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[1].reRender();
						}
					}
					if(furnaceSaves[furnaceSaves.indexOf(a)].fuel == 0 || a.inventory[0].item != c[0]) {
						furnaceSaves[furnaceSaves.indexOf(a)].smelting=0;
						if(furnaceSaves[furnaceSaves.indexOf(a)].active) 
							furnaceArrowUI.percent=0;
					}
					break;
				}	
			}
		}
	} else if(furnaceUI) {
		socket.emit("storage block", {x:mpFurnace.x, y:mpFurnace.y});
	} else if(chestUI) {
		socket.emit("storage block", {x:mpChest.x, y:mpChest.y});
	}
}