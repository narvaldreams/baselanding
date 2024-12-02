import Image from 'next/image';
import * as Icon from "react-feather";




export default function Contact() {
  return ( <div className="container relative">
    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
      <div className="lg:col-span-7 md:col-span-6">
        <Image
          width={ 0 }
          height={ 0 }
          sizes="100vw"
          style={ { width: "100%", height: "auto" } }
          src="/images/contact.svg"
          alt=""
        />
      </div>

      <div className="lg:col-span-5 md:col-span-6">
        <div className="lg:ms-5">
          <div className="bg-white rounded-md shadow  p-6">
            <h3 className="mb-6 text-2xl leading-normal font-medium">
              Ponte en contacto
            </h3>

            <form>
              <div className="grid grid-cols-1">
                <div className="mb-3">
                  <div className="text-start">
                    <label htmlFor="name" className="font-semibold">
                      Nombres:
                    </label>
                    <div className="form-icon relative mt-2">
                      <Icon.User className="size-4 absolute top-3 start-4"></Icon.User>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="Ingresa sus nombres"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="mb-3">
                    <label htmlFor="email" className="font-semibold">
                      Email:
                    </label>
                    <div className="form-icon relative mt-2">
                      <Icon.Mail className="size-4 absolute top-3 start-4"></Icon.Mail>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent  dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="Ingresa su email"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div className="mb-5">
                  <div className="text-start">
                    <label htmlFor="subject" className="font-semibold">
                      Asunto:
                    </label>
                    <div className="form-icon relative mt-2">
                      <Icon.Book className="size-4 absolute top-3 start-4"></Icon.Book>
                      <input
                        name="subject"
                        id="subject"
                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent  dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="Ingresa el asunto"

                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-start">
                    <label htmlFor="comments" className="font-semibold">
                      Comentario:
                    </label>
                    <div className="form-icon relative mt-2">
                      <Icon.MessageCircle className="size-4 absolute top-3 start-4"></Icon.MessageCircle>
                      <textarea
                        name="comments"
                        id="comments"
                        className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent  dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="Ingresa tu comentario"

                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                id="submit"
                name="send"
                className="py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md justify-center flex items-center"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> );
}