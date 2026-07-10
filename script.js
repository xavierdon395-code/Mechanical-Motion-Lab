const sliderCanvas = document.getElementById("sliderCanvas");
const sliderCtx = sliderCanvas.getContext("2d");
const sliderSpeed = document.getElementById("sliderSpeed");

const gearCanvas = document.getElementById("gearCanvas");
const gearCtx = gearCanvas.getContext("2d");
const gearSpeed = document.getElementById("gearSpeed");

let t = 0;

function drawCirclePoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawSliderCrank() {
  const ctx = sliderCtx;
  const w = sliderCanvas.width;
  const h = sliderCanvas.height;

  ctx.clearRect(0, 0, w, h);

  const centerX = 180;
  const centerY = 140;
  const crankR = 58;
  const rodLength = 260;

  const angle = t * 0.04 * Number(sliderSpeed.value);

  const crankX = centerX + crankR * Math.cos(angle);
  const crankY = centerY + crankR * Math.sin(angle);

  const dx = Math.sqrt(Math.max(rodLength * rodLength - (crankY - centerY) ** 2, 0));
  const sliderX = crankX + dx;
  const sliderY = centerY;

  // 底部轨道
  ctx.strokeStyle = "#9fb3c8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(80, centerY + 58);
  ctx.lineTo(650, centerY + 58);
  ctx.stroke();

  // 曲柄运动圆
  ctx.strokeStyle = "#bcccdc";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, crankR, 0, Math.PI * 2);
  ctx.stroke();

  // 曲柄
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(crankX, crankY);
  ctx.stroke();

  // 连杆
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(crankX, crankY);
  ctx.lineTo(sliderX, sliderY);
  ctx.stroke();

  // 滑块导轨
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.strokeRect(430, centerY - 32, 230, 64);

  // 滑块
  ctx.fillStyle = "#10b981";
  ctx.fillRect(sliderX - 34, sliderY - 28, 68, 56);

  // 关节点
  drawCirclePoint(ctx, centerX, centerY, 8, "#1e3a8a");
  drawCirclePoint(ctx, crankX, crankY, 8, "#c2410c");
  drawCirclePoint(ctx, sliderX, sliderY, 8, "#065f46");

  // 标签
  ctx.fillStyle = "#1f2937";
  ctx.font = "18px sans-serif";
  ctx.fillText("曲柄 crank", 120, 48);
  ctx.fillText("连杆 connecting rod", 270, 84);
  ctx.fillText("滑块 slider", 525, 82);

  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("旋转运动 → 往复直线运动", 250, 245);
}

function drawGear(ctx, x, y, radius, teeth, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.beginPath();

  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? radius + 9 : radius;
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const px = r * Math.cos(a);
    const py = r * Math.sin(a);

    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = "#1f2937";
  ctx.lineWidth = 3;
  ctx.stroke();

  // 齿轮中心孔
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();

  // 方向线
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(radius, 0);
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();
}

function drawGears() {
  const ctx = gearCtx;

  ctx.clearRect(0, 0, gearCanvas.width, gearCanvas.height);

  const speed = Number(gearSpeed.value);
  const smallGearAngle = t * 0.035 * speed;
  const bigGearAngle = -smallGearAngle * 0.55;

  drawGear(ctx, 260, 150, 70, 18, smallGearAngle, "#60a5fa");
  drawGear(ctx, 410, 150, 96, 24, bigGearAngle, "#fbbf24");

  ctx.fillStyle = "#1f2937";
  ctx.font = "18px sans-serif";
  ctx.fillText("小齿轮：转速较快", 160, 55);
  ctx.fillText("大齿轮：转速较慢", 435, 55);

  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("啮合传动：两个齿轮方向相反，半径较大的齿轮转速较慢。", 160, 260);
}

function animate() {
  t += 1;
  drawSliderCrank();
  drawGears();
  requestAnimationFrame(animate);
}

animate();