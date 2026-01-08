const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const env = require("../utils/env");
const { update } = require("./activitylogs");

function signAccessToken(payload) {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_EXPIRES,
  });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: Math.max(env.REFRESH_EXPIRES, 60) + "s",
  });
}

const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHarsh || "");
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const payload = {
      userId: user.id,
      institutionId: user.institutionId,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      status: user.status,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // store refresh token on user record
    const expiresAt = new Date(Date.now() + env.REFRESH_EXPIRES * 1000);
    await user.update({
      refreshToken: refreshToken,
      refreshExpiresAt: expiresAt,
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: env.REFRESH_EXPIRES * 1000,
    });

    return res.json({
      success: true,
      accessToken,
      data: payload,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
const adminLogin = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const institution = await db.Institution.findOne({ where: { email } });
    if (!institution)
      return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, institution.passwordHarsh || "");
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const payload = {
      institutionId: institution.id,
      institutionName: institution.institutionName,
      email: institution.email,
      logo: institution.logo,
      email: institution.email,
      createdAt: institution.createdAt,
      updatedAt: institution.updatedAt,
      status: institution.status,
      address: institution.address,
      phone: institution.phone,
    };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    // store refresh token on user record
    const expiresAt = new Date(Date.now() + env.REFRESH_EXPIRES * 1000);
    await institution.update({
      refreshToken: refreshToken,
      refreshExpiresAt: expiresAt,
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: env.REFRESH_EXPIRES * 1000,
    });

    return res.json({
      success: true,
      accessToken,
      data: payload,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

async function refresh(req, res) {
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken)
    return res.status(400).json({ error: "refreshToken required" });
  try {
    payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

    const useExists = await db.User.findOne({
      where: { refreshToken: payload.refreshToken },
    });

    if (!useExists)
      return res.status(401).json({ error: "Refresh token not found" });
    if (
      useExists.refreshExpiresAt &&
      new Date(useExists.refreshExpiresAt) < new Date()
    ) {
      await storedUser.update({ refreshToken: null, refreshExpiresAt: null });
      return res.status(401).json({ error: "Refresh token expired" });
    }
    // issue new tokens (rotate)
    const user = useExists;
    if (!useExists) return res.status(401).json({ error: "User not found" });
    const payload = {
      userId: user.id,
      institutionId: user.institutionId,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      status: user.status,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // store refresh token on user record
    const expiresAt = new Date(Date.now() + env.REFRESH_EXPIRES * 1000);
    await user.update({
      refreshToken: refreshToken,
      refreshExpiresAt: expiresAt,
    });

    // rotate token on user
    await user.update({
      refreshToken: refreshToken,
      refreshExpiresAt: expiresAt,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: env.REFRESH_EXPIRES * 1000,
    });
    return res.json({
      success: true,
      accessToken,
      data: payload,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function logout(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "refreshToken required" });
  try {
    const user = await db.User.findOne({
      where: { refreshToken: refreshToken },
    });
    if (user) {
      await user.update({ refreshToken: null, refreshExpiresAt: null });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function create(req, res) {
  try {
    // hash password before creating
    if (req.body.passwordHarsh) {
      req.body.passwordHarsh = await bcrypt.hash(req.body.passwordHarsh, 10);
    }
    const item = await db.User.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
}
