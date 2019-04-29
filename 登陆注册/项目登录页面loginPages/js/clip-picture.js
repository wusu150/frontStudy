/**
 * Created by jkwu on 17-12-18.
 */
var $ = function(id) {
  return document.getElementById(id);
};
var oCropImg = $("cropTestImg"), oRectImg = $("rectTestImg");
fnImageCropRot(oCropImg);

setInterval(function() {
  var cropPosX = parseInt($("cropPosX").value) || 0,
    cropPosY = parseInt($("cropPosY").value) || 0,
    cropImageWidth = parseInt($("cropImageWidth").value) || 0,
    cropImageHeight = parseInt($("cropImageHeight").value) || 0;

  oRectImg.style.clip = "rect("+ cropPosY + "px "+ (cropImageWidth + cropPosX) +"px "+ (cropImageHeight + cropPosY) +"px "+ cropPosX +"px)";
}, 100);