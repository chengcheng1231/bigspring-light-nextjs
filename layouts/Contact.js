import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  // const { frontmatter } = data;
  const { title } = data;
  const { contact_form_action } = config.params;

  return (
    <section className="section" id="contact">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <p className="mt-4 text-center text-2xl">
          {markdownify(data.description)}
        </p>
        <div className="section pb-0">
          <div className="col-12">
            <form
              className="contact-form"
              method="POST"
              action={contact_form_action}
            >
              {/* give a gap for flex item */}
              <div className="flex flex-wrap">
                <div className="mb-3 w-full md:w-1/2 md:pr-2">
                  <input
                    className="form-input w-full rounded"
                    name="firstName"
                    type="text"
                    placeholder={data.form.firstName}
                    required
                  />
                </div>
                <div className="mb-3 w-full md:w-1/2 md:pl-2">
                  <input
                    className="form-input w-full rounded"
                    name="lastName"
                    type="text"
                    placeholder={data.form.lastName}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="mb-3 w-full md:w-1/2 md:pr-2">
                  <input
                    className="form-input w-full rounded"
                    name="companyName"
                    type="text"
                    placeholder={data.form.companyName}
                    required
                  />
                </div>
                <div className="mb-3 w-full md:w-1/2 md:pl-2">
                  <input
                    className="form-input w-full rounded"
                    name="position"
                    type="text"
                    placeholder={data.form.position}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder={data.form.email}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  placeholder={data.form.message}
                />
              </div>
              <div className="flex w-full justify-center">
                <button type="submit" className="btn btn-primary">
                  {data.requestSample}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
