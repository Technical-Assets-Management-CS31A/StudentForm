import React, { useState } from 'react';
import { Upload, User, MapPin, GraduationCap } from 'lucide-react';

interface FormData {
  profilePicture: File | null;
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  course: string;
  year: string;
  section: string;
  street: string;
  cityMunicipality: string;
  province: string;
  postalCode: string;
}

interface FormErrors {
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  studentId?: string;
  course?: string;
  year?: string;
  section?: string;
  street?: string;
  cityMunicipality?: string;
  province?: string;
  postalCode?: string;
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '2px solid #d1d5db',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  outline: 'none',
  transition: 'all 0.2s'
};

const inputErrorStyle = {
  ...inputStyle,
  borderColor: '#dc2626'
};

const inputFocusStyle = {
  borderColor: '#3b82f6',
  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '0.5rem'
};

const errorStyle = {
  color: '#dc2626',
  fontSize: '0.75rem',
  marginTop: '0.25rem'
};

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    profilePicture: null,
    firstName: "",
    middleName: "",
    lastName: "",
    studentId: "",
    course: "",
    year: "",
    section: "",
    street: "",
    cityMunicipality: "",
    province: "",
    postalCode: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          profilePicture: file
        }));
        
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        if (errors.profilePicture) {
          setErrors(prev => ({
            ...prev,
            profilePicture: ''
          }));
        }
      } else {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'Please select a valid image file'
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.profilePicture) newErrors.profilePicture = 'Profile picture is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.cityMunicipality.trim()) newErrors.cityMunicipality = 'City/Municipality is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    if (formData.postalCode && !/^\d{4}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be 4 digits';
    }

    if (formData.studentId && formData.studentId.length < 8) {
      newErrors.studentId = 'Student ID must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Registration submitted successfully!');
    }
  };

  const getInputStyle = (fieldName: string) => ({
    ...inputStyle,
    ...(errors[fieldName as keyof FormErrors] ? { borderColor: '#dc2626' } : {}),
    ...(focusedField === fieldName ? inputFocusStyle : {})
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      padding: '2rem 1rem'
    }}>
      {/* Header Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1e40af',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          margin: '0 0 0.5rem 0'
        }}>
          ACLC Mandaue Student Form
        </h1>
        <div style={{
          width: '100px',
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
          margin: '0 auto',
          borderRadius: '2px'
        }}></div>
      </div>

      <div style={{
        maxWidth: '48rem',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #2563eb, #4f46e5)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            margin: '0 0 0.5rem 0'
          }}>
            <GraduationCap style={{ width: '2rem', height: '2rem' }} />
            Student Registration
          </h2>
          <p style={{
            color: '#bfdbfe',
            margin: '0',
            fontSize: '1rem'
          }}>Please fill in all required information</p>
        </div>

        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Profile Picture Section */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <User style={{ width: '1.25rem', height: '1.25rem' }} />
              Profile Picture
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '8rem',
                  height: '8rem',
                  borderRadius: '50%',
                  border: '4px solid #d1d5db',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <Upload style={{ width: '2rem', height: '2rem', color: '#9ca3af' }} />
                  )}
                </div>
              </div>
              
              <label style={{
                cursor: 'pointer',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                <Upload style={{ width: '1rem', height: '1rem' }} />
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
              
              {errors.profilePicture && (
                <p style={errorStyle}>{errors.profilePicture}</p>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <User style={{ width: '1.25rem', height: '1.25rem' }} />
              Personal Information
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              <div>
                <label style={labelStyle}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('firstName')}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p style={errorStyle}>{errors.firstName}</p>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('middleName')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('middleName')}
                  placeholder="Enter middle name"
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('lastName')}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p style={errorStyle}>{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <GraduationCap style={{ width: '1.25rem', height: '1.25rem' }} />
              Academic Information
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              <div>
                <label style={labelStyle}>
                  Student ID Number *
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('studentId')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('studentId')}
                  placeholder="Enter student ID"
                />
                {errors.studentId && (
                  <p style={errorStyle}>{errors.studentId}</p>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  Course *
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('course')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('course')}
                  placeholder="Enter course"
                />
                {errors.course && (
                  <p style={errorStyle}>{errors.course}</p>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  Year *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('year')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('year')}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
                {errors.year && (
                  <p style={errorStyle}>{errors.year}</p>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  Section *
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('section')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('section')}
                  placeholder="Enter section"
                />
                {errors.section && (
                  <p style={errorStyle}>{errors.section}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MapPin style={{ width: '1.25rem', height: '1.25rem' }} />
              Address Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('street')}
                  onBlur={() => setFocusedField('')}
                  style={getInputStyle('street')}
                  placeholder="Enter street address"
                />
                {errors.street && (
                  <p style={errorStyle}>{errors.street}</p>
                )}
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem' 
              }}>
                <div>
                  <label style={labelStyle}>
                    City/Municipality *
                  </label>
                  <input
                    type="text"
                    name="cityMunicipality"
                    value={formData.cityMunicipality}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('cityMunicipality')}
                    onBlur={() => setFocusedField('')}
                    style={getInputStyle('cityMunicipality')}
                    placeholder="Enter city/municipality"
                  />
                  {errors.cityMunicipality && (
                    <p style={errorStyle}>{errors.cityMunicipality}</p>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>
                    Province *
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('province')}
                    onBlur={() => setFocusedField('')}
                    style={getInputStyle('province')}
                    placeholder="Enter province"
                  />
                  {errors.province && (
                    <p style={errorStyle}>{errors.province}</p>
                  )}
                </div>
              </div>

              <div style={{ maxWidth: '200px' }}>
                <label style={labelStyle}>
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('postalCode')}
                  onBlur={() => setFocusedField('')}
                  maxLength={4}
                  style={getInputStyle('postalCode')}
                  placeholder="Enter postal code"
                />
                {errors.postalCode && (
                  <p style={errorStyle}>{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ 
            paddingTop: '1.5rem', 
            borderTop: '2px solid #e5e7eb' 
          }}>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #2563eb, #4f46e5)',
                color: 'white',
                fontWeight: '600',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #1d4ed8, #4338ca)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb, #4f46e5)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Submit Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}