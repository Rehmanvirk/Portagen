import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { portfolioAPI } from '../api/portfolioAPI'
import { templateAPI } from '../api/templateAPI'
import toast from 'react-hot-toast'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  templateId: yup.string().required('Template is required'),
  personalInfo: yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    title: yup.string().required('Title is required'),
    about: yup.string().required('About is required'),
    contact: yup.object().shape({
      email: yup.string().email('Invalid email').required('Email is required'),
      phone: yup.string(),
      location: yup.string(),
      linkedin: yup.string().url('Invalid URL'),
      github: yup.string().url('Invalid URL'),
      website: yup.string().url('Invalid URL'),
    }),
  }),
})

export const EditPortfolio = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, control, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  })

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  })

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience',
  })

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects',
  })

  const watchedTemplateId = watch('templateId')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch portfolio data
        const portfolioResponse = await portfolioAPI.getPortfolioById(id)
        const portfolio = portfolioResponse.data
        
        // Set form values
        reset({
          title: portfolio.title,
          templateId: portfolio.templateId._id,
          personalInfo: portfolio.personalInfo,
          education: portfolio.education.length > 0 ? portfolio.education : [{ degree: '', institution: '', startYear: '', endYear: '' }],
          experience: portfolio.experience.length > 0 ? portfolio.experience : [{ role: '', company: '', startDate: '', endDate: '', description: '' }],
          projects: portfolio.projects.length > 0 ? portfolio.projects : [{ name: '', description: '', link: '' }],
          skills: portfolio.skills.join(', '),
          isPublic: portfolio.isPublic,
        })
        
        // Fetch templates
        const templatesResponse = await templateAPI.getTemplates()
        setTemplates(templatesResponse.data)
      } catch (error) {
        toast.error('Failed to fetch portfolio data')
        console.error(error)
        navigate('/dashboard')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, navigate, reset])

  const steps = [
    { name: 'Basic Info', id: 'basic' },
    { name: 'Education', id: 'education' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Template', id: 'template' },
    { name: 'Review', id: 'review' },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Convert skills from comma-separated string to array
      const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      
      const updatedData = {
        ...data,
        skills: skillsArray,
      }
      
      await portfolioAPI.updatePortfolio(id, updatedData)
      toast.success('Portfolio updated successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to update portfolio')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Portfolio Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  {...register('title')}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.fullName" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.fullName"
                  {...register('personalInfo.fullName')}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.personalInfo?.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.fullName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.title" className="block text-sm font-medium leading-6 text-gray-900">
                Professional Title
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.title"
                  {...register('personalInfo.title')}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.personalInfo?.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.title.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="personalInfo.about"
                  {...register('personalInfo.about')}
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.personalInfo?.about && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.about.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.contact.email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.contact.email"
                  {...register('personalInfo.contact.email')}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.personalInfo?.contact?.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.contact.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.contact.phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.contact.phone"
                  {...register('personalInfo.contact.phone')}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.contact.location" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.contact.location"
                  {...register('personalInfo.contact.location')}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.contact.linkedin" className="block text-sm font-medium leading-6 text-gray-900">
                LinkedIn
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.contact.linkedin"
                  {...register('personalInfo.contact.linkedin')}
                  type="text"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.personalInfo?.contact?.linkedin && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.contact.linkedin.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.contact.github" className="block text-sm font-medium leading-6 text-gray-900">
                GitHub
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.contact.github"
                  {...register('personalInfo.contact.github')}
                  type="text"
                  placeholder="https://github.com/yourusername"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.personalInfo?.contact?.github && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.contact.github.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="personalInfo.contact.website" className="block text-sm font-medium leading-6 text-gray-900">
                Website
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.contact.website"
                  {...register('personalInfo.contact.website')}
                  type="text"
                  placeholder="https://yourwebsite.com"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.personalInfo?.contact?.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.personalInfo.contact.website.message}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 1: // Education
        return (
          <div className="space-y-6">
            {educationFields.map((field, index) => (
              <div key={field.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Education {index + 1}</h3>
                  {educationFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`education.${index}.degree`} className="block text-sm font-medium leading-6 text-gray-900">
                      Degree
                    </label>
                    <div className="mt-2">
                      <input
                        id={`education.${index}.degree`}
                        {...register(`education.${index}.degree`)}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`education.${index}.institution`} className="block text-sm font-medium leading-6 text-gray-900">
                      Institution
                    </label>
                    <div className="mt-2">
                      <input
                        id={`education.${index}.institution`}
                        {...register(`education.${index}.institution`)}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`education.${index}.startYear`} className="block text-sm font-medium leading-6 text-gray-900">
                      Start Year
                    </label>
                    <div className="mt-2">
                      <input
                        id={`education.${index}.startYear`}
                        {...register(`education.${index}.startYear`)}
                        type="text"
                        placeholder="e.g., 2018"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`education.${index}.endYear`} className="block text-sm font-medium leading-6 text-gray-900">
                      End Year
                    </label>
                    <div className="mt-2">
                      <input
                        id={`education.${index}.endYear`}
                        {...register(`education.${index}.endYear`)}
                        type="text"
                        placeholder="e.g., 2022 or Present"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendEducation({ degree: '', institution: '', startYear: '', endYear: '' })}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Education
            </button>
          </div>
        )

      case 2: // Experience
        return (
          <div className="space-y-6">
            {experienceFields.map((field, index) => (
              <div key={field.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                  {experienceFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`experience.${index}.role`} className="block text-sm font-medium leading-6 text-gray-900">
                      Role
                    </label>
                    <div className="mt-2">
                      <input
                        id={`experience.${index}.role`}
                        {...register(`experience.${index}.role`)}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`experience.${index}.company`} className="block text-sm font-medium leading-6 text-gray-900">
                      Company
                    </label>
                    <div className="mt-2">
                      <input
                        id={`experience.${index}.company`}
                        {...register(`experience.${index}.company`)}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`experience.${index}.startDate`} className="block text-sm font-medium leading-6 text-gray-900">
                      Start Date
                    </label>
                    <div className="mt-2">
                      <input
                        id={`experience.${index}.startDate`}
                        {...register(`experience.${index}.startDate`)}
                        type="text"
                        placeholder="e.g., Jan 2020"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`experience.${index}.endDate`} className="block text-sm font-medium leading-6 text-gray-900">
                      End Date
                    </label>
                    <div className="mt-2">
                      <input
                        id={`experience.${index}.endDate`}
                        {...register(`experience.${index}.endDate`)}
                        type="text"
                        placeholder="e.g., Dec 2022 or Present"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor={`experience.${index}.description`} className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id={`experience.${index}.description`}
                      {...register(`experience.${index}.description`)}
                      rows={4}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendExperience({ role: '', company: '', startDate: '', endDate: '', description: '' })}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Experience
            </button>
          </div>
        )

      case 3: // Projects
        return (
          <div className="space-y-6">
            {projectFields.map((field, index) => (
              <div key={field.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Project {index + 1}</h3>
                  {projectFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`projects.${index}.name`} className="block text-sm font-medium leading-6 text-gray-900">
                      Project Name
                    </label>
                    <div className="mt-2">
                      <input
                        id={`projects.${index}.name`}
                        {...register(`projects.${index}.name`)}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`projects.${index}.description`} className="block text-sm font-medium leading-6 text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id={`projects.${index}.description`}
                        {...register(`projects.${index}.description`)}
                        rows={4}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`projects.${index}.link`} className="block text-sm font-medium leading-6 text-gray-900">
                      Project Link
                    </label>
                    <div className="mt-2">
                      <input
                        id={`projects.${index}.link`}
                        {...register(`projects.${index}.link`)}
                        type="text"
                        placeholder="https://example.com"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendProject({ name: '', description: '', link: '' })}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Project
            </button>
          </div>
        )

      case 4: // Skills
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                Skills (comma separated)
              </label>
              <div className="mt-2">
                <textarea
                  id="skills"
                  {...register('skills')}
                  rows={4}
                  placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        )

      case 5: // Template
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="templateId" className="block text-sm font-medium leading-6 text-gray-900">
                Select Template
              </label>
              <div className="mt-2">
                <select
                  id="templateId"
                  {...register('templateId')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select a template</option>
                  {templates.map((template) => (
                    <option key={template._id} value={template._id}>
                      {template.name} {template.isPremium ? '(Premium)' : '(Free)'}
                    </option>
                  ))}
                </select>
                {errors.templateId && (
                  <p className="mt-1 text-sm text-red-600">{errors.templateId.message}</p>
                )}
              </div>
            </div>
            
            {watchedTemplateId && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Template Preview</h3>
                <div className="mt-2">
                  {templates.find(t => t._id === watchedTemplateId) && (
                    <img
                      src={templates.find(t => t._id === watchedTemplateId).previewUrl}
                      alt="Template Preview"
                      className="h-64 w-full object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )

      case 6: // Review
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review Your Portfolio</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {watch('title')}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal Information
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {watch('personalInfo.fullName')}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {watch('personalInfo.title')}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {watch('personalInfo.contact.email')}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Template</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {templates.find(t => t._id === watchedTemplateId)?.name || 'Not selected'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <nav aria-label="Progress">
          <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative md:flex md:flex-1">
                {currentStep > stepIdx ? (
                  <div className="group flex w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                    </span>
                  </div>
                ) : currentStep === stepIdx ? (
                  <div className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                      <span className="text-indigo-600">{stepIdx + 1}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                        <span className="text-gray-500 group-hover:text-gray-900">{stepIdx + 1}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                    </span>
                  </div>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <>
                    {/* Arrow separator for lg screens and up */}
                    <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
          {renderStepContent()}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="inline h-4 w-4 mr-1" />
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Portfolio'}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
                <ChevronRightIcon className="inline h-4 w-4 ml-1" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}