import { useState } from 'react';
import { Plus, FileText, User, Hash, Type, Trash2, Sparkles } from 'lucide-react';

interface DocumentInfo {
  title: string;
  author: string;
}

interface Section {
  id: number;
  title: string;
  content: string;
}

export default function InkanGenerator(): JSX.Element {
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>({
    title: '',
    author: ''
  });

  const [sections, setSections] = useState<Section[]>([
    { id: 1, title: '', content: '' }
  ]);

  const updateDocumentInfo = (field: keyof DocumentInfo, value: string): void => {
    setDocumentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSection = (id: number, field: keyof Omit<Section, 'id'>, value: string): void => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const addSection = (): void => {
    if (sections.length < 4) {
      const newId = Math.max(...sections.map(s => s.id)) + 1;
      setSections(prev => [...prev, { id: newId, title: '', content: '' }]);
    }
  };

  const removeSection = (id: number): void => {
    if (sections.length > 1) {
      setSections(prev => prev.filter(section => section.id !== id));
    }
  };

  const isSectionComplete = (section: Section): boolean => {
    return section.title.trim() !== '' && section.content.trim() !== '';
  };

  const canAddSection = (): boolean => {
    return sections.length < 4 && sections.some(section => isSectionComplete(section));
  };

  const handleGenerate = (): void => {
    console.log('Generating document with:', { documentInfo, sections });
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-none px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Inkan Generator
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Create secure, verifiable documents with our advanced generation system
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          {/* Document Information Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Document Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Type className="h-4 w-4" />
                  Document Title
                </label>
                <input
                  type="text"
                  value={documentInfo.title}
                  onChange={(e) => updateDocumentInfo('title', e.target.value)}
                  placeholder="Enter document title..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-black"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User className="h-4 w-4" />
                  Author Name
                </label>
                <input
                  type="text"
                  value={documentInfo.author}
                  onChange={(e) => updateDocumentInfo('author', e.target.value)}
                  placeholder="Enter author name..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-black"
                />
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-xl">
                  <Hash className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Document Sections</h2>
              </div>
              <div className="text-sm text-slate-500">
                {sections.length}/4 sections
              </div>
            </div>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="relative bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-lg font-medium text-slate-700">
                        Section {index + 1}
                      </span>
                    </div>
                    {sections.length > 1 && (
                      <button
                        onClick={() => removeSection(section.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        placeholder="Enter section title..."
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Content
                      </label>
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                        placeholder="Enter section content..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 resize-none text-black"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Section Button */}
              {canAddSection() && (
                <button
                  onClick={addSection}
                  className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Plus className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Add New Section</span>
                </button>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={!documentInfo.title.trim() || !documentInfo.author.trim() || !sections.some(s => isSectionComplete(s))}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed transition-all duration-200"
            >
              <Sparkles className="h-6 w-6" />
              Generate Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
