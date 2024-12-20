import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  author: string;
  content: string;
  images?: string[];
  timestamp: string;
}

export const PostCard = ({ author, content, images, timestamp }: PostCardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liked, setLiked] = useState(false);

  const nextSlide = () => {
    if (images && currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm animate-fade-in">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {author[0]}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{author}</h3>
            <p className="text-sm text-gray-500">{timestamp}</p>
          </div>
        </div>

        <p className="text-gray-800 mb-4">{content}</p>

        {images && images.length > 0 && (
          <div className="relative mb-4">
            <div className="overflow-hidden rounded-lg aspect-video">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      currentSlide === index
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "hover:text-rose-600 transition-colors",
              liked && "text-rose-600"
            )}
            onClick={() => setLiked(!liked)}
          >
            <Heart className="w-5 h-5 mr-1" />
            <span>Like</span>
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-5 h-5 mr-1" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};