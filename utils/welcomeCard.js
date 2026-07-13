const { createCanvas, loadImage } = require("canvas");
const path = require("path");

module.exports = async (member) => {
    const canvas = createCanvas(1536, 1024);
    const ctx = canvas.getContext("2d");

    // =========================
    // Background
    // =========================
    const background = await loadImage(
        path.join(__dirname, "../assets/background.png")
    );

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // =========================
    // Avatar
    // =========================
    const avatar = await loadImage(
        member.user.displayAvatarURL({
            extension: "png",
            size: 1024,
            forceStatic: true,
        })
    );

    const centerX = 1200;
    const centerY = 507;
    const radius = 208;

    ctx.save();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const scale = Math.max(
        (radius * 2) / avatar.width,
        (radius * 2) / avatar.height
    );

    const width = avatar.width * scale;
    const height = avatar.height * scale;

    ctx.drawImage(
        avatar,
        centerX - width / 2,
        centerY - height / 2,
        width,
        height
    );

    ctx.restore();

    // =========================
    // Text Style
    // =========================
    ctx.fillStyle = "#FFFFFF";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#9b4dff";
    ctx.shadowBlur = 18;

    // خط افتراضي يدعم العربي والإنجليزي إذا كان متوفراً
    const FONT = 'sans-serif';

    // =========================
    // MEMBER
    // =========================
    ctx.textAlign = "left";
    ctx.font = `bold 30px ${FONT}`;

    const username =
        member.displayName || member.user.globalName || member.user.username;

    ctx.fillText(username, 185, 500);

    // =========================
    // ACCOUNT CREATED
    // =========================
    ctx.font = `28px ${FONT}`;
    ctx.fillText(
        member.user.createdAt.toLocaleDateString("en-GB"),
        595,
        500
    );

    // =========================
    // JOINED SERVER
    // =========================
    ctx.fillText(
        member.joinedAt.toLocaleDateString("en-GB"),
        185,
        670
    );

    // =========================
    // MEMBER COUNT
    // =========================
    ctx.fillText(
        `#${member.guild.memberCount}`,
        595,
        670
    );

    // =========================
    // INVITED BY
    // =========================
    ctx.fillText(
        "Unknown",
        185,
        840
    );

    // =========================
    // USER ID
    // =========================
    ctx.font = `22px ${FONT}`;
    ctx.fillText(
        member.user.id,
        595,
        840
    );

    ctx.shadowBlur = 0;

    return canvas.toBuffer("image/png");
};