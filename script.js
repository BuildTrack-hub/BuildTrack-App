document.body.classList.add("motion-ready");

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const sceneImages = document.querySelectorAll("[data-scene]");

function mulberry32(seed) {
  let t = seed;
  return function () {
    t += 0x6d2b79f5;
    let result = Math.imul(t ^ (t >>> 15), t | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

const scenePalettes = {
  framing: ["#24385f", "#495f92", "#c88a3d", "#ecbf5e", "#f4efe4"],
  plumbing: ["#183953", "#255f8f", "#4ec0ff", "#d8edf8", "#94e8ff"],
  concrete: ["#2d3247", "#4e566d", "#9ea8bb", "#d9dfeb", "#ffd48c"],
  electrical: ["#221f45", "#4d4ca8", "#38c0ff", "#f6c65f", "#e8f0ff"],
  finishing: ["#27314b", "#566681", "#ed946d", "#f2d9c2", "#f8f3ee"],
  site: ["#22324c", "#495d7d", "#74d0ff", "#ffc86a", "#eef7ff"],
  roofing: ["#18253a", "#4d5c7a", "#5ad6d7", "#f1b261", "#fcfaf7"],
  masonry: ["#261f2d", "#6d4f57", "#b76e51", "#f2d3b8", "#f5efe8"],
};

function drawGradient(ctx, width, height, palette) {
  const sky = ctx.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, palette[0]);
  sky.addColorStop(0.55, palette[1]);
  sky.addColorStop(1, "#0c1228");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createLinearGradient(width * 0.1, 0, width * 0.9, height);
  glow.addColorStop(0, `${palette[2]}22`);
  glow.addColorStop(0.5, `${palette[3]}1b`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

function drawSceneBase(ctx, width, height, palette, rand) {
  drawGradient(ctx, width, height, palette);

  ctx.fillStyle = "rgba(255,255,255,0.03)";
  for (let i = 0; i < 8; i += 1) {
    ctx.fillRect(0, height * 0.15 + i * 56, width, 1);
  }

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(0, height * 0.74, width, height * 0.26);

  for (let i = 0; i < 90; i += 1) {
    ctx.fillStyle = `rgba(255,255,255,${0.03 + rand() * 0.06})`;
    ctx.fillRect(rand() * width, rand() * height, 1.6, 1.6);
  }
}

function drawFrameWork(ctx, width, height, palette, rand) {
  ctx.strokeStyle = `${palette[3]}66`;
  ctx.lineWidth = 8;
  for (let i = 0; i < 5; i += 1) {
    const x = 70 + i * 120;
    ctx.beginPath();
    ctx.moveTo(x, 70);
    ctx.lineTo(x, height - 70);
    ctx.stroke();
  }

  ctx.lineWidth = 10;
  ctx.strokeStyle = `${palette[2]}bb`;
  ctx.beginPath();
  ctx.moveTo(60, 130);
  ctx.lineTo(width - 70, 130);
  ctx.moveTo(60, 250);
  ctx.lineTo(width - 70, 250);
  ctx.moveTo(60, 370);
  ctx.lineTo(width - 70, 370);
  ctx.stroke();

  ctx.fillStyle = `${palette[4]}cc`;
  for (let i = 0; i < 3; i += 1) {
    const x = 120 + i * 180 + rand() * 20;
    const y = height - 130 - rand() * 30;
    ctx.fillRect(x, y, 20, 90);
    ctx.fillRect(x - 18, y + 22, 56, 12);
  }
}

function drawPipes(ctx, width, height, palette) {
  ctx.lineCap = "round";
  ctx.strokeStyle = `${palette[2]}cc`;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(120, 110);
  ctx.lineTo(120, 400);
  ctx.lineTo(300, 400);
  ctx.moveTo(320, 90);
  ctx.lineTo(320, 300);
  ctx.lineTo(540, 300);
  ctx.moveTo(520, 120);
  ctx.lineTo(520, 420);
  ctx.stroke();

  ctx.strokeStyle = `${palette[4]}88`;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(80, 210);
  ctx.lineTo(210, 210);
  ctx.moveTo(260, 180);
  ctx.lineTo(420, 180);
  ctx.moveTo(420, 360);
  ctx.lineTo(640, 360);
  ctx.stroke();
}

function drawConcrete(ctx, width, height, palette, rand) {
  for (let col = 0; col < 4; col += 1) {
    for (let row = 0; row < 3; row += 1) {
      const x = 45 + col * 160;
      const y = 80 + row * 120;
      ctx.fillStyle = `${palette[(row + col) % palette.length]}44`;
      ctx.fillRect(x, y, 130, 90);
      ctx.strokeStyle = `${palette[3]}55`;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, 130, 90);
    }
  }

  ctx.fillStyle = `${palette[4]}cc`;
  for (let i = 0; i < 3; i += 1) {
    ctx.fillRect(110 + i * 180 + rand() * 8, 410, 14, 70);
  }
}

function drawElectrical(ctx, width, height, palette, rand) {
  ctx.strokeStyle = `${palette[2]}bb`;
  ctx.lineWidth = 6;
  for (let i = 0; i < 5; i += 1) {
    const y = 110 + i * 70;
    ctx.beginPath();
    ctx.moveTo(70, y);
    ctx.bezierCurveTo(200, y - 40, 340, y + 40, width - 80, y);
    ctx.stroke();
  }

  ctx.fillStyle = `${palette[4]}d8`;
  for (let i = 0; i < 6; i += 1) {
    const x = 100 + i * 90 + rand() * 15;
    const y = 120 + (i % 3) * 105;
    ctx.fillRect(x, y, 38, 28);
  }
}

function drawFinishing(ctx, width, height, palette, rand) {
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      const x = 70 + col * 92;
      const y = 85 + row * 74;
      ctx.fillStyle = row % 2 === 0 ? `${palette[3]}66` : `${palette[4]}55`;
      ctx.fillRect(x, y, 72, 56);
    }
  }

  ctx.fillStyle = `${palette[2]}cc`;
  ctx.fillRect(140, 365, 260, 22);
  ctx.fillStyle = `${palette[4]}dd`;
  ctx.fillRect(395, 345, 18, 90);
  ctx.fillRect(413, 345, 85, 26);
  ctx.fillStyle = `${palette[1]}aa`;
  ctx.fillRect(515 + rand() * 10, 120, 34, 190);
}

function drawSite(ctx, width, height, palette) {
  ctx.fillStyle = `${palette[3]}55`;
  ctx.fillRect(70, 320, width - 140, 24);
  ctx.fillStyle = `${palette[2]}aa`;
  ctx.fillRect(110, 210, 80, 110);
  ctx.fillRect(250, 180, 90, 140);
  ctx.fillRect(410, 150, 110, 170);
  ctx.fillRect(560, 235, 60, 85);
  ctx.fillStyle = `${palette[4]}cc`;
  ctx.fillRect(80, 360, width - 160, 16);
}

function drawRoofing(ctx, width, height, palette) {
  ctx.strokeStyle = `${palette[3]}66`;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(110, 360);
  ctx.lineTo(360, 120);
  ctx.lineTo(610, 360);
  ctx.stroke();

  ctx.lineWidth = 6;
  ctx.strokeStyle = `${palette[2]}bb`;
  for (let i = 0; i < 6; i += 1) {
    ctx.beginPath();
    ctx.moveTo(160 + i * 65, 320 - i * 42);
    ctx.lineTo(230 + i * 65, 380 - i * 42);
    ctx.stroke();
  }

  ctx.fillStyle = `${palette[4]}d0`;
  ctx.fillRect(170, 390, 360, 18);
}

function drawMasonry(ctx, width, height, palette) {
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const x = 70 + col * 85 + (row % 2) * 20;
      const y = 115 + row * 62;
      ctx.fillStyle = row % 2 === 0 ? `${palette[2]}bb` : `${palette[3]}77`;
      ctx.fillRect(x, y, 62, 38);
    }
  }

  ctx.fillStyle = `${palette[4]}cc`;
  ctx.fillRect(120, 420, 440, 18);
}

function addPhotoTreatment(ctx, width, height) {
  const vignette = ctx.createRadialGradient(width / 2, height / 2, 120, width / 2, height / 2, width * 0.72);
  vignette.addColorStop(0, "transparent");
  vignette.addColorStop(1, "rgba(3, 7, 18, 0.42)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fillRect(18, 18, 140, 10);
  ctx.fillRect(18, 36, 82, 8);
}

function createScene(type, seed) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = 720;
  const height = 540;
  const palette = scenePalettes[type] || scenePalettes.site;
  const rand = mulberry32(seed + type.length * 101);

  canvas.width = width;
  canvas.height = height;

  drawSceneBase(ctx, width, height, palette, rand);

  switch (type) {
    case "framing":
      drawFrameWork(ctx, width, height, palette, rand);
      break;
    case "plumbing":
      drawPipes(ctx, width, height, palette);
      break;
    case "concrete":
      drawConcrete(ctx, width, height, palette, rand);
      break;
    case "electrical":
      drawElectrical(ctx, width, height, palette, rand);
      break;
    case "finishing":
      drawFinishing(ctx, width, height, palette, rand);
      break;
    case "roofing":
      drawRoofing(ctx, width, height, palette);
      break;
    case "masonry":
      drawMasonry(ctx, width, height, palette);
      break;
    case "site":
    default:
      drawSite(ctx, width, height, palette);
      break;
  }

  addPhotoTreatment(ctx, width, height);
  return canvas.toDataURL("image/png");
}

sceneImages.forEach((image, index) => {
  const type = image.dataset.scene || "site";
  image.loading = "lazy";
  image.decoding = "async";
  image.src = createScene(type, index + 17);
});
