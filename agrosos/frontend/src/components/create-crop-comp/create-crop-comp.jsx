import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../context/DarkModeContext"; // Importa useDarkMode
import "./create-crop-comp.css";

const CreateCropForm = () => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [info, setInfo] = useState("");
    const [cropImage, setCropImage] = useState(null);
    const [cropImagePreview, setCropImagePreview] = useState(null);
    const [graphicImage, setGraphicImage] = useState(null);
    const [graphicImagePreview, setGraphicImagePreview] = useState(null);
    const [harvestStartMonth, setHarvestStartMonth] = useState("");
    const [harvestEndMonth, setHarvestEndMonth] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { darkMode } = useDarkMode(); // Obtiene el estado darkMode

    const months = t("months", { returnObjects: true });

    const validateForm = () => {
        if (!name || !info || !cropImage || !graphicImage || !harvestStartMonth || !harvestEndMonth) {
            setError(t("error_message"));
            return false;
        }
        return true;
    };

    const handleImageChange = (e, setImage, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
        e.target.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm() || loading) return;

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            setError(t("authentication_error"));
            navigate("/login");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("info", info);
        formData.append("crop_image", cropImage);
        formData.append("graphic_image", graphicImage);
        formData.append("harvest_start_month", harvestStartMonth);
        formData.append("harvest_end_month", harvestEndMonth);

        try {
            await axios.post("http://localhost:3000/api/crops", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setName("");
            setInfo("");
            setCropImage(null);
            setCropImagePreview(null);
            setGraphicImage(null);
            setGraphicImagePreview(null);
            setError("");
            setSuccess(true);

            navigate("/crops");
        } catch (error) {
            setError(t("creation_error"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/crops");
    };

    const handleKeyDown = (e, inputId) => {
        if (e.key === "Enter") {
            document.getElementById(inputId).click();
        }
    };

    return (
        <div className={darkMode ? 'dark-mode' : ''}> {/* Aplica la clase dark-mode */}
            <form onSubmit={handleSubmit} className="create-crop-form">
                <h2 className="create-crop-form-title">{t("create_crop_form_title")}</h2>
                {error && <p className="create-crop-error-message" aria-live="assertive">{error}</p>}
                {success && (
                    <p className="create-crop-success-message" aria-live="polite">
                        {t("success_message")}
                    </p>
                )}
                <div className="create-crop-form-group">
                    <label className="create-crop-form-label" htmlFor="name">{t("name_label")}</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="create-crop-form-input"
                        tabIndex="0"
                        aria-required="true"
                    />
                </div>
                <div className="create-crop-form-group">
                    <label className="create-crop-form-label" htmlFor="info">{t("info_label")}</label>
                    <textarea
                        id="info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        className="create-crop-form-textarea"
                        tabIndex="0"
                        aria-required="true"
                    ></textarea>
                </div>
                <div className="create-crop-form-group">
                    <label className="create-crop-form-label">{t("upload_images_label")}</label>
                </div>
                <div
                    className="create-crop-upload-container"
                    onClick={() => document.getElementById("crop-image-input").click()}
                    onKeyDown={(e) => handleKeyDown(e, "crop-image-input")}
                    tabIndex="0"
                    role="button"
                    aria-label={t("crop_image_label")}
                >
                    <p>{t("crop_image_label")}</p>
                    <input
                        id="crop-image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setCropImage, setCropImagePreview)}
                        style={{ display: "none" }}
                        tabIndex="0"
                    />
                </div>
                {cropImagePreview && (
                    <img
                        src={cropImagePreview}
                        alt="Vista previa de la imagen del cultivo"
                        className="create-crop-image-preview"
                        aria-describedby="crop-image-description"
                        aria-required="true"
                    />
                )}
                <div
                    className="create-crop-upload-container"
                    onClick={() => document.getElementById("graphic-image-input").click()}
                    onKeyDown={(e) => handleKeyDown(e, "graphic-image-input")}
                    tabIndex="0"
                    role="button"
                    aria-label={t("graphic_image_label")}
                >
                    <p>{t("graphic_image_label")}</p>
                    <input
                        id="graphic-image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setGraphicImage, setGraphicImagePreview)}
                        style={{ display: "none" }}
                        tabIndex="0"
                    />
                </div>
                {graphicImagePreview && (
                    <img
                        src={graphicImagePreview}
                        alt="Vista previa de la imagen gráfica del cultivo"
                        className="create-crop-image-preview"
                        aria-describedby="graphic-image-description"
                        aria-required="true"
                    />
                )}
                <div className="create-crop-form-group">
                    <label className="create-crop-form-label">{t("harvest_time_label")}</label>
                    <div className="create-crop-time-range">
                        <select
                            value={harvestStartMonth}
                            onChange={(e) => setHarvestStartMonth(e.target.value)}
                            className="create-crop-form-select"
                            tabIndex="0"
                            aria-required="true"
                        >
                            <option value="">{t("select_start_month")}</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            value={harvestEndMonth}
                            onChange={(e) => setHarvestEndMonth(e.target.value)}
                            className="create-crop-form-select"
                            tabIndex="0"
                            aria-required="true"
                        >
                            <option value="">{t("select_end_month")}</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="create-crop-form-buttons">
                    <button
                        type="submit"
                        disabled={loading}
                        className="create-crop-submit-button"
                        tabIndex="0"
                    >
                        {loading ? t("loading_button") : t("create_button")}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="create-crop-cancel-button"
                        tabIndex="0"
                        aria-label={t("cancel_button")}
                    >
                        {t("cancel_button")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCropForm;