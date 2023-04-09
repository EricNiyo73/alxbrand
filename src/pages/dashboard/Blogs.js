import React, { useEffect, useState } from "react";
import { useContext } from "react";
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

// import blog from "../../components/data/blog";

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
  const handleDelete = async (id) => {
    try {
      Notiflix.Confirm.show(
        "COnfirm to delete a post",
        "Are you sure you want to delete this post?",
        "Yes",
        "No",
        async function okCb() {
          await axios.delete(`/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          });
          window.location.reload(true);
        },
        function cancelCb() {
          // window.location.reload(true);
        },
        {
          width: "320px",
          borderRadius: "8px",
          // etc...
        }
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
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
  }, [selected]);
  const onSubmit = async ({ image, title }) => {
    if (!description) {
      setError("Description is required");
      return;
    } else {
      setError("");
    }
    try {
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
    }
  };

  return (
    <>
      {blogs.length < 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className="content">
          <h1>All post here</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>N</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr> */}
                {blogs.map((item, index) => {
                  const { title, createdAt, _id } = item;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        {title.length < 70 ? title : title.slice(0, 69) + "..."}
                      </td>
                      <td>{createdAt.substring(0, 10)}</td>
                      <td className="actions">
                        <span
                          className="edit"
                          onClick={() => {
                            getSingleBlog(_id);
                            setModal(true);
                          }}
                        >
                          Edit
                        </span>
                        <span
                          className="delete"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {/* </tr> */}
              </tbody>
            </table>
          </div>
          <div
            onClick={() => setModal(false)}
            className="update"
            style={{ display: !modal ? "none" : "flex" }}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit(onSubmit)}
            >
              <span className="btn1" onClick={() => setModal(false)}>
                <ImCross />
              </span>

              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Enter title here..."
                  {...register("title")}
                />
                <span className="error">{errors?.title?.message}</span>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                {/* {...register("description")} */}
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
              <div>
                <label htmlFor="">Image</label>
                <input
                  type="file"
                  // value={selected?.image}
                  {...register("image")}
                />
                <span className="error">{errors?.image?.message}</span>
              </div>
              <div className="btns">
                <button className="button">Update</button>
              </div>
            </form>
          </div>
          {/* <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Blogs;
