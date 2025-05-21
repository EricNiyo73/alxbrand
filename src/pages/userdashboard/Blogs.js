import React, { useEffect, useState, useContext } from "react";
import { ImCross } from "react-icons/im";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../axios/axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Report } from "notiflix/build/notiflix-report-aio";
import Notiflix from "notiflix";
import { AppContext } from "../../context/AppProvider";

const schema = yup.object().shape({
  image: yup.mixed().test("required", "Choose an Image for blog", (value) => {
    return value && value.length;
  }),
  title: yup.string().required(),
  description: yup.string().required(),
});

const Blogs = () => {
  const { auth, blogs } = useContext(AppContext);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      Notiflix.Confirm.show(
        "Confirm to delete a post",
        "Are you sure you want to delete this post?",
        "Yes",
        "No",
        async function okCb() {
          setLoading(true);
          await axios.delete(`/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          });
          setLoading(false);
          window.location.reload(true);
        },
        function cancelCb() {
          // Do nothing on cancel
        },
        {
          width: "320px",
          borderRadius: "8px",
        }
      );
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const getSingleBlog = async (id) => {
    const Selected = blogs.find((blog) => blog._id === id);
    setSelected(Selected);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: selected?.title,
      description: selected?.description,
    },
  });

  useEffect(() => {
    reset(selected);
  }, [selected, reset]);

  const onSubmit = async ({ image, title }) => {
    if (!description) {
      setError("Description is required");
      return;
    } else {
      setError("");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image[0]);
      formData.append("title", title);
      formData.append("description", description);

      await axios.patch(`/blog/${selected._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setLoading(false);
      Report.success(
        "You made it!",
        "Blog updated successfully ",
        "Ok",
        function cb() {
          window.location.reload(true);
        }
      );
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <h1>Loading...</h1>
        </div>
      ) : blogs.length === 0 ? (
        <div className="content">
          <h1>No blogs found</h1>
        </div>
      ) : (
        <div className="content">
          <h1>All Posts</h1>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Posted On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((item, index) => {
                  const { title, createdAt, _id } = item;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td className="title-cell">
                        {title.length < 70 ? title : title.slice(0, 69) + "..."}
                      </td>
                      <td>{createdAt.substring(0, 10)}</td>
                      <td className="actions">
                        <button
                          className="edit"
                          onClick={() => {
                            getSingleBlog(_id);
                            setModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div
            onClick={() => setModal(false)}
            className={`update-modal ${modal ? "active" : ""}`}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-header">
                <h2>Edit Blog Post</h2>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setModal(false)}
                >
                  <ImCross />
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title here..."
                  {...register("title")}
                />
                <span className="error">{errors?.title?.message}</span>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <CKEditor
                  name="description"
                  editor={ClassicEditor}
                  data={selected?.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                />
                <span className="error">{error}</span>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" {...register("image")} />
                <span className="error">{errors?.image?.message}</span>
              </div>

              <div className="form-actions">
                <button type="submit" className="update-btn" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
