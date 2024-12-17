import {
  useAddAdMutation,
  useAllCategoriesQuery,
  useAllTagsQuery,
  useEditAdMutation,
  useGetAdByIdQuery,
} from "../generated/graphql-types";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react/jsx-runtime";
import { GET_AD_BY_ID, GET_ALL_ADS } from "../graphql/queries";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: string;
  pictures: { url: string }[];
  location: string;
  category: number;
  tags?: string[];
};

type DataForNewAd = {
  price: number;
  category: string;
  tags: string[];
  pictures: string[];
  title: string;
  description: string;
  owner: string;
  location: string;
};

type DataforEditAd = DataForNewAd & {
  id: number;
};

type formTypeProps = {
  formType: string;
  id?: string;
};

function AdForm(props: formTypeProps) {
  const { id, formType } = props;
  const navigate = useNavigate();
  const { data: categoriesData } = useAllCategoriesQuery();
  const { data: tagsData } = useAllTagsQuery();
  const [addAdMutation] = useAddAdMutation();
  const [editAdMutation] = useEditAdMutation();
  const {
    data: addData,
    loading,
    error,
  } = useGetAdByIdQuery({
    variables: {
      getAdByIdId: parseFloat(id!),
    },
    skip: !id,
  });
  const categories = categoriesData?.AllCategories;
  const tags = tagsData?.AllTags;
  const prefilledDatas = addData?.getAdById;

  let prefilledDatasPictures = undefined;
  if (prefilledDatas) {
    prefilledDatasPictures = prefilledDatas?.pictures.map((picture) => {
      return {
        url: picture.url,
      };
    });
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: {
      category: prefilledDatas?.category?.id,
      title: prefilledDatas?.title,
      description: prefilledDatas?.description,
      pictures: prefilledDatasPictures,
      location: prefilledDatas?.location,
      owner: prefilledDatas?.owner,
      price: prefilledDatas?.price.toString(),
      tags: prefilledDatas?.tags?.map((tag) => tag.id.toString()),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data from react hook form", data);
    let dataForBackend: DataForNewAd = {
      ...data,
      price: parseInt(data.price),
      category: data.category.toString(),
      tags: !data.tags ? [] : data.tags,
      pictures: data.pictures.map((picture) => picture.url),
    };

    if (formType === "newAd") {
      console.log("data for backend", dataForBackend);
      const { data: createdAdData } = await addAdMutation({
        variables: {
          data: dataForBackend,
        },
        refetchQueries: [GET_ALL_ADS],
        awaitRefetchQueries: true,
      });

      if (createdAdData) {
        toast.success("Ad has been added");
        navigate("/");
      }
    }

    if (formType === "editAd" && id) {
      const dataForEditAd: DataforEditAd = {
        ...dataForBackend,
        id: parseFloat(id!),
      };
      console.log("data for editAd", dataForEditAd);
      const { data: editAdData } = await editAdMutation({
        variables: {
          data: dataForEditAd,
        },
        refetchQueries: [GET_AD_BY_ID, GET_ALL_ADS],
        awaitRefetchQueries: true,
      });

      if (editAdData) {
        toast.success("Ad has been edited");
        navigate("/");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="new-ad">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          Titre de l'annonce:
          <input
            className="text-field"
            {...register("title", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <label className="label">
          Description:
          <input
            className="text-field"
            {...register("description", {
              minLength: { value: 10, message: "Minimum 10 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <label className="label">
          Vendeur:
          <input
            className="text-field"
            {...register("owner", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="owner"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <label className="label">
          Prix :
          <input
            type="number"
            className="text-field"
            {...register("price", {
              min: { value: 0, message: "Minimum 0" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="price"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <label className="label">
          Photos:
          {fields.map((field, index) => {
            return (
              <li className="image-field" key={field.id}>
                <input
                  className="text-field"
                  {...register(`pictures.${index}.url`, { required: true })}
                />
                <button
                  className="button"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </li>
            );
          })}
          <button
            className="button"
            type="button"
            onClick={() => append({ url: "" })}
          >
            Add Image
          </button>
        </label>
        <ErrorMessage
          errors={errors}
          name="picture"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <label className="label">
          Ville :
          <input
            className="text-field"
            {...register("location", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="location"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <label className="label">
          Category :
          <select {...register("category")}>
            {categories?.map((el: any) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </label>
        <ErrorMessage
          errors={errors}
          name="createdAt"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <label className="label">
          Tags:
          {tags?.map((tag) => (
            <div key={tag.id}>
              <input
                {...register("tags")}
                type="checkbox"
                value={tag.id}
                id={tag.name}
              />
              {tag.name}
            </div>
          ))}
        </label>

        <input type="submit" className="button" />
      </form>
    </div>
  );
}

export default AdForm;
