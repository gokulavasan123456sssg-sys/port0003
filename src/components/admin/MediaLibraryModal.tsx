import React, { useState } from 'react';
import { X, Upload, Trash2, Copy, Check, Search, Film, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaItem } from '../../types';

interface MediaLibraryModalProps {
  onClose: () => void;
  onSelectMedia?: (url: string) => void;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({ onClose, onSelectMedia }) => {
  const { media, addMedia, deleteMedia } = usePortfolio();
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const filteredMedia = media.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    Array.from(files).forEach((file) => {
      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();

      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          await addMedia({
            name: file.name,
            type: isVideo ? 'video' : 'image',
            url: reader.result,
            thumbnail_url: reader.result,
            size_kb: Math.round(file.size / 1024),
          });
        }
      };

      reader.readAsDataURL(file);
    });
    setUploading(false);
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0c0c12] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-800/80 mb-6 flex-shrink-0">
          <div>
            <h3 className="font-heading text-2xl uppercase tracking-wider text-white font-bold">
              MEDIA ASSETS LIBRARY
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              PHOTOS (JPG, PNG, WEBP) & VIDEOS (MP4, WEBM, MOV)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Filters, and Upload Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 flex-shrink-0">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media files by name..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cinema-red"
            />
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
              {(['all', 'image', 'video'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-colors ${
                    filterType === type
                      ? 'bg-cinema-red text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'ALL' : type === 'image' ? 'IMAGES' : 'VIDEOS'}
                </button>
              ))}
            </div>

            {/* Upload Button */}
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-widest font-semibold border border-neutral-700 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-cinema-red" />
              <span>{uploading ? 'UPLOADING...' : 'UPLOAD MEDIA'}</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          {filteredMedia.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
              <ImageIcon className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-400 font-mono text-xs">No media files found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full bg-black overflow-hidden">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}

                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono uppercase text-cinema-red">
                      {item.type}
                    </span>

                    {/* Quick action buttons on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleCopyUrl(item)}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white hover:border-cinema-red transition-colors"
                        title="Copy Media URL"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      {onSelectMedia && (
                        <button
                          onClick={() => {
                            onSelectMedia(item.url);
                            onClose();
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-cinema-red text-white text-[10px] font-mono font-bold"
                        >
                          SELECT
                        </button>
                      )}

                      <button
                        onClick={() => deleteMedia(item.id)}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-red-400 hover:bg-red-950 transition-colors"
                        title="Delete Media Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-2.5 bg-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span className="truncate max-w-[120px]">{item.name}</span>
                    {item.size_kb && <span>{item.size_kb} KB</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
