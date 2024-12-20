import { CustomImage } from '@/components/image/CustomImage';
import { FiMessageCircle } from 'react-icons/fi';
import { IoBookOutline, IoMailOutline, IoPersonOutline } from 'react-icons/io5';

interface Props {
  imageUrl: string | null | undefined;
}

export default function Contact({ imageUrl }: Props) {
  return ( <div className="container relative">
    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
      <div className="lg:col-span-7 md:col-span-6">
        <CustomImage src={ imageUrl ? imageUrl : '/uploads/no-image.jpg' } width={ 350 } height={ 350 } className="mx-auto" alt='Formualio de contacto' />
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
                      <IoPersonOutline className="size-4 absolute top-3 start-4"></IoPersonOutline>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
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
                      <IoMailOutline className="size-4 absolute top-3 start-4"></IoMailOutline>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
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
                      <IoBookOutline className="size-4 absolute top-3 start-4"></IoBookOutline>
                      <input
                        name="subject"
                        id="subject"
                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
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
                      <FiMessageCircle className="size-4 absolute top-3 start-4"></FiMessageCircle>
                      <textarea
                        name="comments"
                        id="comments"
                        className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent  rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
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