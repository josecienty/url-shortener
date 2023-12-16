"use client";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

type Inputs = {
  enlace?: string;
  bool_alias?: boolean;
  alias?: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const showAlias: boolean | undefined = useWatch({
    control,
    name: "bool_alias",
    defaultValue: false,
  });

  useEffect(() => {
    setValue("alias", "");
  }, [showAlias, setValue]);

  const hidden = true;
  const submit = (result: Inputs) => {
    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    })
      .then((res) => res.json())
      .then((res) => {});
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" w-full lg:w-[50vw] ">
        <div className="text-center my-4">
          <h1 className="text-3xl font-bold">Acortar enlaces</h1>
          <small className="text-gray-500">
            Acorta tus enlaces de forma rápida y simple.
          </small>
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-gray-50 text-gray-600 px-10 py-8 shadow-xl rounded-2xl"
        >
          <div className="">
            <label htmlFor="enlace" className="">
              Enlace
            </label>
            <div className="flex">
              <input
                {...register("enlace", { required: true })}
                type="text"
                name="enlace"
                id="enlace"
                placeholder="      https://example.domain"
                className="shadow appearance-none border  rounded w-full py-3 px-3 text-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full text-right">
              <input
                {...register("bool_alias")}
                type="checkbox"
                name="bool_alias"
                id="bool_alias"
                className="mx-2 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="bool_alias" className="cursor-pointer">
                Añadir alias
              </label>
            </div>
          </div>
          {showAlias ? (
            <div>
              <label htmlFor="alias">Alias</label>

              <input
                {...register("alias", { required: showAlias })}
                type="text"
                name="alias"
                id="alias"
                className="shadow appearance-none border  rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ) : (
            ""
          )}
          <div className="my-4">
            <button className="btn bg-orange-500 text-white  w-full px-4 py-3 rounded-sm hover:bg-orange-600 transition-all">
              Acortar
            </button>
            <button
              type="reset"
              className="btn bg-gray-500 text-white  w-full px-4 py-2 rounded-sm hover:bg-gray-700 mt-4 transition-all"
            >
              Limpiar formulario
            </button>
          </div>
        </form>
        <div className="text-center w-full pt-4">
          <small className="text-gray-500">
            Desarrollado por <strong>José Argüello</strong> para uso personal.
          </small>
        </div>
      </div>
    </main>
  );
}
