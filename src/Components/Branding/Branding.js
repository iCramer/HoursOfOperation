import React, { useState } from 'react';
import './Branding.css';

const Branding = () => {
  const [branding, setBranding] = useState({fullName: '', shortName: '', welcomeText: ''});
  const [brandingBackup, setBrandingBackup] = useState(branding);
  const [editMode, setEditMode] = useState(false);

  const editBrand = (evt, fieldName) => {
    const newBranding = Object.assign({}, branding);
    newBranding[fieldName] = evt.target.value;
    setBranding(newBranding);
  }

  const startEdit = () => {
    setBrandingBackup(Object.assign({}, branding));
    setEditMode(true);
  }

  const cancelEdit = () => {
    setEditMode(false);
    setBranding(brandingBackup);
  }

  return (
    <>
      <header>
        <h1>Branding</h1>
        <span>
          {!editMode && (
            <button onClick={() => startEdit()} className="link-btn">Edit</button>
          )}
          {editMode && (
            <>
              <button onClick={() => cancelEdit()} className="link-btn">Cancel</button>
              <button onClick={() => setEditMode(false)}>Save</button>
            </>
          )}
        </span>
      </header>
      <p>Set name, welcome page text, and other branding for your patients to see during exams.</p>
      <h3>Display Name</h3>
      <p>Set how the organization name is displayed to patients. In instances with limited screen space(emails, mobile views), a shortened name is displayed.</p>

      <div className="brand-form">
        <div>
          <label>Full Name</label>
          {!editMode && (
            <span>{branding.fullName}</span>
          )}
          {editMode && (
            <input type="text" value={branding.fullName} onChange={(evt) => editBrand(evt, 'fullName')} />
          )}
        </div>
        <div>
          <label>Short Name</label>
          {!editMode && (
            <span>{branding.shortName}</span>
          )}
          {editMode && (
            <input type="text" value={branding.shortName} onChange={(evt) => editBrand(evt, 'shortName')} />
          )}
        </div>
        <div>
          <label>Welcome Text</label>
          {!editMode && (
            <span>{branding.welcomeText}</span>
          )}
          {editMode && (
            <input type="text" value={branding.welcomeText} onChange={(evt) => editBrand(evt, 'welcomeText')} />
          )}
        </div>
      </div>
    </>
  )
}

export default Branding;
