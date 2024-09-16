import React, { useState } from "react";
import { Api } from "../../api/api.config";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    state: "",
    location: "",
    identification: null,
    profilePicture: null,
    role: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submitting) {
      setSubmitting(true);

      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          form.append(key, formData[key]);
        }
      });
      // if(form)
      if(formData.fullName !== formData.accountName){
        setSubmitting(false)
        return toast.error("Full name and account name must be the same");
      }
      try {
        const response = await Api.post("/signup", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Signup successful", response.data);
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          password: "",
          bankName: "",
          accountNumber: "",
          accountName: "",
          state: "",
          location: "",
          identification: null,
          profilePicture: null,
          role: "",
        });
        navigate("/Loginpage"); // Redirect to the login page after successful signup
      } catch (error) {
        console.error("Signup failed", error);
        if (error.response) {
          const errorCode = error.response.status;
          console.error(`Problem occurred. Received status: ${errorCode}`);
          console.error("Error details:", error.response.data);
          toast.error(error?.response?.data?.message)
        } else {
          console.error("Did not receive response");
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  const banksInNigeria = [
    "AccessBank",
    "First Bank of Nigeria",
    "Guaranty Trust Bank (GTBank)",
    "United Bank for Africa (UBA)",
    "Zenith Bank",
    "Fidelity Bank",
    "Union Bank",
    "StanbicIBTC Bank",
    "Sterling Bank",
    "EcoBank",
    "PolarisBank",
    "WemaBank",
    "HeritageBank",
    "Opay",
    "Moniepoint",
    "Palmpay",
    "Kuda",
    "Wrapspeed",
    "FairMoney",
  ];

  const roles = [
    'cader', 'sampler', 'mapper', 'Ftd', 'Cdp', 'Tde', 'Merchandiser', 'Ime', 'Fme',' Vss',' Vsr'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              name: "fullName",
              type: "text",
              placeholder: "Enter your full name",
            },
            {
              name: "phoneNumber",
              type: "tel",
              placeholder: "Enter your phone number",
              pattern: "\\d{11}",
            },
            {
              name: "email",
              type: "email",
              placeholder: "Enter your email address",
            },
            {
              name: "password",
              type: "password",
              placeholder: "Enter your password",
            },
            {
              name: "accountNumber",
              type: "text",
              placeholder: "Enter your 10-digit account number",
              pattern: "\\d{10}",
            },
            {
              name: "accountName",
              type: "text",
              placeholder: "Enter the account holder name",
            },
            {
              name: "state",
              type: "text",
              placeholder: "Enter your state of residence",
            },
            {
              name: "location",
              type: "text",
              placeholder: "Enter your city/town",
            },
          ].map(({ name, type, placeholder, pattern }) => (
            <div key={name}>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                pattern={pattern}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
              />
            </div>
          ))}
          <div>
            <select
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            >
              <option value="" disabled>
                Select your bank
              </option>
              {banksInNigeria.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            >
              <option value="" disabled>
                Select your role
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              id="identification"
              name="identification"
              type="file"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            />
          </div>
          <div>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            {submitting ? "Submitting..." : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/Loginpage"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
