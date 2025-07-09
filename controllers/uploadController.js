import env from "../config/env.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "이미지가 없습니다" });
  }

  try {
    const form = new FormData();
    form.append("image", fs.createReadStream(req.file.path), req.file.originalname);

    const flaskRes = await axios.post(
      env.FLASK_INFER_URL,
      form,
      { headers: form.getHeaders() }
    );

    fs.unlink(req.file.path, () => {});

    res.json({ message: flaskRes.data });
  } catch (error) {
    if (req.file) fs.unlink(req.file.path, () => {});

    res.status(502).json({
      error: "[Flask] " + (error?.response?.data?.error || error.message || "Flask 서버 오류"),
      flaskResponse: error?.response?.data
    });
  }
};
