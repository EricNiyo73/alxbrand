import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../axios/axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Report } from "notiflix/build/notiflix-report-aio";
import { AppContext } from "../../context/AppProvider";

const schema = yup.object().shape({
  image: yup.mixed().test("required", "Choose an Image for blog", (value) => {
    return value && value.length;
  }),
  title: yup.string().required("Title is required"),
});

const Create = () => {
  const { auth } = useContext(AppContext);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ image, title }) => {
    if (!description) {
      setError("Description is required");
      return;
    } else {
      setError("");
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("image", image[0]);
      formData.append("title", title);
      formData.append("description", description);

      await axios.post("/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      Report.success("You made it!", "Blog created successfully", "Ok", {
        timeout: 2000,
      });

      setTimeout(() => {
        window.location.reload(true);
      }, 3000);

      reset();
      setDescription("");
    } catch (error) {
      console.log(error.response);
      Report.failure(
        "Error",
        "Failed to create blog post. Please try again.",
        "Ok"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Configure CKEditor toolbar based on screen size
  const getEditorConfig = () => {
    if (windowWidth <= 480) {
      // Simplified toolbar for mobile
      return {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "bulletedList",
          "numberedList",
        ],
      };
    }

    // Default toolbar for larger screens
    return {
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
      ],
    };
  };

  return (
    <div className=" blog-form-container">
      <h1 className="form-title">Create Post</h1>
      <div className="blog-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title here..."
              {...register("title")}
              className="form-input"
            />
            {errors?.title && (
              <span className="error">{errors.title.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="editor-wrapper">
              <CKEditor
                name="description"
                editor={ClassicEditor}
                data={description}
                config={getEditorConfig()}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </div>
            {error && <span className="error">{error}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image" className="file-label">
              Upload Image
              <div className="file-input-container">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  {...register("image")}
                  className="file-input"
                />
              </div>
            </label>
            {errors?.image && (
              <span className="error">{errors.image.message}</span>
            )}
          </div>

          <div className="form-button-container">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
