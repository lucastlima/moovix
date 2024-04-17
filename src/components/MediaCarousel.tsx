"use client";

import { ApiConfig } from "@/service/models/ApiConfig";
import { Movie } from "@/service/models/MoviesResponse";
import { getMediaUrl } from "@/utils";
import { log } from "console";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";
import Image from "next/image";

type MediaCarroselProps = {
  media?: Movie[];
  config: ApiConfig;
};

export function MediaCarousel({ media = [], config }: MediaCarroselProps) {
  const duplicatedItems = [...media, ...media];

  const baseX = useMotionValue(0);

  const x = useTransform(baseX, (v) => `-${v % 50}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = 1 * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const renderMedia = () => {
    return (
      <motion.div className="flex gap-2" style={{ x }}>
        {duplicatedItems.map((item, idx) => {
          return (
            <motion.div key={item.id + idx} className="flex relative">
              <motion.div className="flex w-[200px]">
                <Image
                  width={384}
                  height={576}
                  src={getMediaUrl(config, item.poster_path, 4)}
                  alt={item.title}
                />
              </motion.div>
              <motion.div className="flex flex-col justify-end absolute w-full h-full z-10 p-2">
                <h3>{item.title}</h3>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <motion.div className="flex overflow-hidden">{renderMedia()}</motion.div>
  );
}
