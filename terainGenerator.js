function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function customChance(chance1, chance2, chance3) {
	var random = randomRange(1, chance1+chance2+chance3)
	if(random <= chance1) {
		return 0;
	} else if(random <= chance1+chance2) {
		return 1;
	}else
		return 2;
}
function mapGeneratorConstructor() {
	this.mapLength=1000;
	this.terainBaseHeight = 40;
	this.terainHeight=[];
	this.generate = function(){
		for(var a=0;a<100;a++) {
			this.terainHeight[a]=this.terainBaseHeight;
		}
		var actionsHistory=[];
		var adjustedTerain=0;
		while(true){
			var areaLength=randomRange(5,10);
			action = customChance(1,2,1);

			if(adjustedTerain+areaLength>this.mapLength-1){
				areaLength=this.mapLength-adjustedTerain-1;
			}
			if(action==0) {
				for(var m=1;m<areaLength+1;m++) {
					if(this.terainHeight[adjustedTerain+m-1]-2 > 20){
						this.terainHeight[adjustedTerain+m]=this.terainHeight[adjustedTerain+m-1]-customChance(4,5,1);
					}else {
						areaLength=m-1;
						break;
					}
				}
			}else if(action==1) {
				for(var m=1;m<areaLength+1;m++) {
					this.terainHeight[adjustedTerain+m]=this.terainHeight[adjustedTerain+m-1]+customChance(1,9,2)-1;
				}
			}else if(action==2) {
				for(var m=1;m<areaLength+1;m++) {
					if(this.terainHeight[adjustedTerain+m-1]+2 < 60){
						this.terainHeight[adjustedTerain+m]=this.terainHeight[adjustedTerain+m-1]+customChance(4,5,1);
					}else {
						areaLength=m-1;
						break;
					}
				}
			}
			adjustedTerain+=areaLength
			if(adjustedTerain==this.mapLength-1)
				break;
		}
		map = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(var a=0; a<map.length;a++) {
			for(var b=0; b<this.mapLength;b++) {
				if (a>map.length-4) {
					map[a][b]=6;
				}else if(a>this.terainHeight[b]+3){
					if(randomRange(0, 100) || a<5 || b<5){
						map[a][b]=0;
					}else{
						var randomNum=randomRange(0,3)
						if(randomNum==0){
								map[a][b]=7
							if(randomRange(0,2))
								map[a][b-1]=7
							if(randomRange(0,2))
								map[a-1][b]=7
							if(randomRange(0,2))
								map[a-1][b-1]=7
							if(randomRange(0,2))
								map[a][b-2]=7
							if(randomRange(0,2))
								map[a-2][b]=7
						} else if(randomNum==1){
								map[a][b]=8
							if(randomRange(0,2))
								map[a][b-1]=8
							if(randomRange(0,2))
								map[a-1][b]=8
							if(randomRange(0,2))
								map[a-1][b-1]=8
							if(randomRange(0,2))
								map[a][b-2]=8
							if(randomRange(0,2))
								map[a-2][b]=8
						}if(randomNum==2){
								map[a][b]=9
							if(randomRange(0,2))
								map[a][b-1]=9
							if(randomRange(0,2))
								map[a-1][b]=9
							if(randomRange(0,2))
								map[a-1][b-1]=9
							if(randomRange(0,2))
								map[a][b-2]=9
							if(randomRange(0,2))
								map[a-2][b]=9
						}if(randomNum==3){
								map[a][b]=10
							if(randomRange(0,2))
								map[a][b-1]=10
							if(randomRange(0,2))
								map[a-1][b]=10
							if(randomRange(0,2))
								map[a-1][b-1]=10
							if(randomRange(0,2))
								map[a][b-2]=10
							if(randomRange(0,2))
								map[a-2][b]=10
						}
					}
				}else if(a>this.terainHeight[b]){
					map[a][b]=5;
				}else if(a>this.terainHeight[b]-1){
					map[a][b]=4;
				}else
					map[a][b]=-1;
			}
		}
		var treeCount=randomRange(this.mapLength/20,this.mapLength/10)
		for(var a=0;a<treeCount;a++) {
			var treeArea = Math.floor(this.mapLength/treeCount)
			var treePosition=randomRange(a*treeArea+3, (a+1)*treeArea-3)
			if(!randomRange(0,4)){
				map[this.terainHeight[treePosition]-1][treePosition]=2
				map[this.terainHeight[treePosition]-2][treePosition]=3
				map[this.terainHeight[treePosition]-2][treePosition+1]=3
				map[this.terainHeight[treePosition]-2][treePosition-1]=3
				map[this.terainHeight[treePosition]-3][treePosition]=3
				map[this.terainHeight[treePosition]-3][treePosition+1]=3
				map[this.terainHeight[treePosition]-3][treePosition-1]=3
			} else if(randomRange(0,2)){
				map[this.terainHeight[treePosition]-1][treePosition]=2
				map[this.terainHeight[treePosition]-2][treePosition]=2
				map[this.terainHeight[treePosition]-3][treePosition]=3
				map[this.terainHeight[treePosition]-3][treePosition+1]=3
				map[this.terainHeight[treePosition]-3][treePosition-1]=3
				map[this.terainHeight[treePosition]-4][treePosition]=3
				map[this.terainHeight[treePosition]-4][treePosition+1]=3
				map[this.terainHeight[treePosition]-4][treePosition-1]=3
			}else {
				map[this.terainHeight[treePosition]-1][treePosition]=2
				map[this.terainHeight[treePosition]-2][treePosition]=2
				map[this.terainHeight[treePosition]-3][treePosition]=2
				map[this.terainHeight[treePosition]-4][treePosition]=3
				map[this.terainHeight[treePosition]-4][treePosition+1]=3
				map[this.terainHeight[treePosition]-4][treePosition-1]=3
				map[this.terainHeight[treePosition]-5][treePosition]=3
				map[this.terainHeight[treePosition]-5][treePosition+1]=3
				map[this.terainHeight[treePosition]-5][treePosition-1]=3
			}
		}
	}
}
mapGenerator = new mapGeneratorConstructor();