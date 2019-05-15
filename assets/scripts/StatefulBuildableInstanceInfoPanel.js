const CloseableDialog = require('./CloseableDialog');
module.export = cc.Class({
  extends: CloseableDialog,

  properties: {
    activeAppearanceSprite: {
      type: cc.Sprite,
      default: null,
    },
    displayNameLabel: {
      type: cc.Label,
      default: null,
    },
    currentLevelLabel: {
      type: cc.Label,
      default: null,
    },
    buildingOrUpgradeRemainingTime: {
      type: cc.ProgressBar,
      default: null,
    },
    remaingLabel: {
      type: cc.Label,
      default: null,
    },
    buildingOrUpgradingInfo: {
      type:cc.Node,
      default: null,
    },
  },

  setInfo(statefulBuildableInstance) {
    this.displayNameLabel.string = statefulBuildableInstance.displayName;
    this.currentLevelLabel.string = statefulBuildableInstance.currentLevel;
    this.activeAppearanceSprite.spriteFrame = statefulBuildableInstance.activeAppearance;
    this.buildingOrUpgradingDuration = statefulBuildableInstance.buildingOrUpgradingDuration[statefulBuildableInstance.currentLevel];
    this.buildingOrUpgradingStartedAt = statefulBuildableInstance.buildingOrUpgradingStartedAt;
    this.buildingOrUpgradingInfo.active = true;
  },

  update(){
    if(!this.buildingOrUpgradingStartedAt){ //还未建造。
      this.buildingOrUpgradeRemainingTime.progress = 0;
      this.remaingLabel.string = secondsToNaturalExp(this.buildingOrUpgradingDuration);
      return;
    }
    const durationMillis = this.buildingOrUpgradingDuration * 1000; //this.buildingOrUpgradingDuration 单位: second
    const startedAtMillis = this.buildingOrUpgradingStartedAt ;
    const currentGMTMillis = Date.now();
    const elapsedMillis = currentGMTMillis - startedAtMillis; 
    let remainingMillis = durationMillis - elapsedMillis;
    if(0 >= remainingMillis) {
      remainingMillis = 0;
     }
    let currentProgress = parseFloat(elapsedMillis / durationMillis); 
    if (1 <= currentProgress){
      currentProgress = 1.0;
    }
    this.buildingOrUpgradeRemainingTime.progress= currentProgress;  
    if(1 > currentProgress){
      this.remaingLabel.string = secondsToNaturalExp(remainingMillis / 1000);
    }else {
      this.remaingLabel.string = "";
    } 
  }
});