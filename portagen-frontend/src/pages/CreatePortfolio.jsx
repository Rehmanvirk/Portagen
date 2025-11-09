import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { portfolioAPI } from "../api/portfolioAPI";
import { templateAPI } from "../api/templateAPI";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Check,
  Sparkles,
} from "lucide-react";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  templateId: yup.string().required("Template is required"),
  personalInfo: yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    title: yup.string().required("Title is required"),
    about: yup.string().required("About is required"),
    contact: yup.object().shape({
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string(),
      location: yup.string(),
      linkedin: yup.string().url("Invalid URL"),
      github: yup.string().url("Invalid URL"),
      website: yup.string().url("Invalid URL"),
    }),
  }),
});

export const CreatePortfolio = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      templateId: location.state?.templateId || "",
      personalInfo: {
        fullName: user?.name || "",
        title: "",
        about: "",
        profilePicture: "",
        contact: {
          email: user?.email || "",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
          website: "",
        },
      },
      education: [{ degree: "", institution: "", startYear: "", endYear: "" }],
      experience: [
        { role: "", company: "", startDate: "", endDate: "", description: "" },
      ],
      projects: [{ name: "", description: "", link: "" }],
      skills: "",
      isPublic: false,
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const watchedTemplateId = watch("templateId");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching templates...");
        const response = await templateAPI.getTemplates();
        console.log("Templates fetched:", response.data);
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        toast.error("Failed to fetch templates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const steps = [
    { name: "Basic Info", id: "basic" },
    { name: "Education", id: "education" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Template", id: "template" },
    { name: "Review", id: "review" },
  ];

  const nextStep = async () => {
    console.log(`Moving from step ${currentStep} to ${currentStep + 1}`);

    let isValid = true;

    if (currentStep === 0) {
      isValid = await trigger([
        "title",
        "personalInfo.fullName",
        "personalInfo.title",
        "personalInfo.about",
        "personalInfo.contact.email",
      ]);
    } else if (currentStep === 5) {
      isValid = await trigger(["templateId"]);
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      console.log("Validation failed for current step");
      toast.error("Please fill in all required fields");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    alert("slkajfalksdf;jklsaf")
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);

    try {
      const skillsArray = data.skills
        ? data.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill)
        : [];

      const portfolioData = {
        ...data,
        skills: skillsArray,
      };

      console.log("Sending portfolio data:", portfolioData);

      const response = await portfolioAPI.createPortfolio(portfolioData);
      console.log("Portfolio created successfully:", response.data);

      toast.success("Portfolio created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating portfolio:", error);
      toast.error("Failed to create portfolio");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="group">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Portfolio Title
              </label>
              <input
                id="title"
                {...register("title")}
                type="text"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="personalInfo.fullName"
                {...register("personalInfo.fullName")}
                type="text"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
              {errors.personalInfo?.fullName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.personalInfo.fullName.message}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Professional Title
              </label>
              <input
                id="personalInfo.title"
                {...register("personalInfo.title")}
                type="text"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
              {errors.personalInfo?.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.personalInfo.title.message}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.about"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                About
              </label>
              <textarea
                id="personalInfo.about"
                {...register("personalInfo.about")}
                rows={4}
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300 resize-none"
              />
              {errors.personalInfo?.about && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.personalInfo.about.message}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.contact.email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="personalInfo.contact.email"
                {...register("personalInfo.contact.email")}
                type="email"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
              {errors.personalInfo?.contact?.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.personalInfo.contact.email.message}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.contact.phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                id="personalInfo.contact.phone"
                {...register("personalInfo.contact.phone")}
                type="text"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.contact.location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                id="personalInfo.contact.location"
                {...register("personalInfo.contact.location")}
                type="text"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.contact.linkedin"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                LinkedIn
              </label>
              <input
                id="personalInfo.contact.linkedin"
                {...register("personalInfo.contact.linkedin")}
                type="text"
                placeholder="https://linkedin.com/in/yourprofile"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
              {errors.personalInfo?.contact?.linkedin && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.personalInfo.contact.linkedin.message}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.contact.github"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                GitHub
              </label>
              <input
                id="personalInfo.contact.github"
                {...register("personalInfo.contact.github")}
                type="text"
                placeholder="https://github.com/yourusername"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
              {errors.personalInfo?.contact?.github && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.personalInfo.contact.github.message}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="personalInfo.contact.website"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Website
              </label>
              <input
                id="personalInfo.contact.website"
                {...register("personalInfo.contact.website")}
                type="text"
                placeholder="https://yourwebsite.com"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              />
              {errors.personalInfo?.contact?.website && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.personalInfo.contact.website.message}
                </p>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {educationFields.map((field, index) => (
              <div
                key={field.id}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Education {index + 1}
                  </h3>
                  {educationFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`education.${index}.degree`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Degree
                    </label>
                    <input
                      id={`education.${index}.degree`}
                      {...register(`education.${index}.degree`)}
                      type="text"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`education.${index}.institution`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Institution
                    </label>
                    <input
                      id={`education.${index}.institution`}
                      {...register(`education.${index}.institution`)}
                      type="text"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`education.${index}.startYear`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Start Year
                    </label>
                    <input
                      id={`education.${index}.startYear`}
                      {...register(`education.${index}.startYear`)}
                      type="text"
                      placeholder="e.g., 2018"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`education.${index}.endYear`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      End Year
                    </label>
                    <input
                      id={`education.${index}.endYear`}
                      {...register(`education.${index}.endYear`)}
                      type="text"
                      placeholder="e.g., 2022 or Present"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendEducation({
                  degree: "",
                  institution: "",
                  startYear: "",
                  endYear: "",
                })
              }
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Education
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {experienceFields.map((field, index) => (
              <div
                key={field.id}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Experience {index + 1}
                  </h3>
                  {experienceFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`experience.${index}.role`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Role
                    </label>
                    <input
                      id={`experience.${index}.role`}
                      {...register(`experience.${index}.role`)}
                      type="text"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`experience.${index}.company`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      id={`experience.${index}.company`}
                      {...register(`experience.${index}.company`)}
                      type="text"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`experience.${index}.startDate`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Start Date
                    </label>
                    <input
                      id={`experience.${index}.startDate`}
                      {...register(`experience.${index}.startDate`)}
                      type="text"
                      placeholder="e.g., Jan 2020"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`experience.${index}.endDate`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      End Date
                    </label>
                    <input
                      id={`experience.${index}.endDate`}
                      {...register(`experience.${index}.endDate`)}
                      type="text"
                      placeholder="e.g., Dec 2022 or Present"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor={`experience.${index}.description`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id={`experience.${index}.description`}
                    {...register(`experience.${index}.description`)}
                    rows={4}
                    className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300 resize-none"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendExperience({
                  role: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Experience
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {projectFields.map((field, index) => (
              <div
                key={field.id}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project {index + 1}
                  </h3>
                  {projectFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`projects.${index}.name`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Project Name
                    </label>
                    <input
                      id={`projects.${index}.name`}
                      {...register(`projects.${index}.name`)}
                      type="text"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`projects.${index}.description`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id={`projects.${index}.description`}
                      {...register(`projects.${index}.description`)}
                      rows={4}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300 resize-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`projects.${index}.link`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Project Link
                    </label>
                    <input
                      id={`projects.${index}.link`}
                      {...register(`projects.${index}.link`)}
                      type="text"
                      placeholder="https://example.com"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendProject({ name: "", description: "", link: "" })
              }
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Skills (comma separated)
              </label>
              <textarea
                id="skills"
                {...register("skills")}
                rows={4}
                placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300 resize-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="templateId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Template
              </label>
              <select
                id="templateId"
                {...register("templateId")}
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
              >
                <option value="">Select a template</option>
                {templates.map((template) => (
                  <option key={template._id} value={template._id}>
                    {template.name}{" "}
                    {template.isPremium ? "(Premium)" : "(Free)"}
                  </option>
                ))}
              </select>
              {errors.templateId && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.templateId.message}
                </p>
              )}
            </div>

            {watchedTemplateId && (
              <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Template Preview
                  </h3>
                </div>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  {templates.find((t) => t._id === watchedTemplateId) && (
                    <img
                      src={
                        templates.find((t) => t._id === watchedTemplateId)
                          .previewUrl
                      }
                      alt="Template Preview"
                      className="w-full h-64 object-cover"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Check className="w-6 h-6 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900">
                Review Your Portfolio
              </h3>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
                <h3 className="text-2xl font-bold text-white">
                  {watch("title")}
                </h3>
                <p className="mt-2 text-indigo-100">Personal Information</p>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      {watch("personalInfo.fullName")}
                    </dd>
                  </div>
                </div>
                <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      {watch("personalInfo.title")}
                    </dd>
                  </div>
                </div>
                <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      {watch("personalInfo.contact.email")}
                    </dd>
                  </div>
                </div>
                <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-gray-500">
                      Template
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      {templates.find((t) => t._id === watchedTemplateId)
                        ?.name || "Not selected"}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Your Portfolio
          </h1>
          <p className="mt-2 text-gray-600">
            Follow the steps below to build your professional portfolio
          </p>
        </div>

        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol role="list" className="flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative flex-1">
                {currentStep > stepIdx ? (
                  <div className="group flex flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-md transition-all duration-200 group-hover:shadow-lg">
                      <Check className="h-5 w-5 text-white" />
                    </span>
                    <span className="mt-2 text-xs font-medium text-indigo-600 hidden sm:block">
                      {step.name}
                    </span>
                  </div>
                ) : currentStep === stepIdx ? (
                  <div
                    className="flex flex-col items-center"
                    aria-current="step"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-500 bg-white shadow-md ring-4 ring-indigo-100">
                      <span className="text-indigo-600 font-semibold text-sm">
                        {stepIdx + 1}
                      </span>
                    </span>
                    <span className="mt-2 text-xs font-medium text-indigo-600 hidden sm:block">
                      {step.name}
                    </span>
                  </div>
                ) : (
                  <div className="group flex flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white transition-all duration-200 group-hover:border-gray-400">
                      <span className="text-gray-400 font-medium text-sm group-hover:text-gray-600">
                        {stepIdx + 1}
                      </span>
                    </span>
                    <span className="mt-2 text-xs font-medium text-gray-500 hidden sm:block group-hover:text-gray-700">
                      {step.name}
                    </span>
                  </div>
                )}

                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-[calc(50%+1.25rem)] right-[calc(-50%+1.25rem)] top-5 h-0.5 bg-gray-200 hidden sm:block">
                    <div
                      className={`h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ${
                        currentStep > stepIdx ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl shadow-sm hover:bg-gray-50 hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Create Portfolio
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
