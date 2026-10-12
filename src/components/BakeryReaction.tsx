"use client";

import { motion, useReducedMotion } from "framer-motion";

type BakeryReactionProps = {
  visible: boolean;
  reaction: number;
};

type Reaction = {
  face: string;
  icon: string;
  text: string;
};

const reactions: Reaction[] = [
  // ❤️ LOVE
  { face: "🧸", icon: "❤️", text: "Love this one!" },
  { face: "🧸", icon: "💕", text: "Too cute!" },
  { face: "🧸", icon: "💖", text: "Absolutely adorable!" },
  { face: "🧸", icon: "💗", text: "My heart!" },
  { face: "🧸", icon: "💝", text: "Made with love!" },
  { face: "🧸", icon: "💓", text: "Feeling the love!" },
  { face: "🧸", icon: "❤️", text: "This has my heart!" },
  { face: "🧸", icon: "💘", text: "Sweet choice!" },
  { face: "🧸", icon: "💕", text: "Awwww!" },
  { face: "🧸", icon: "💗", text: "So lovely!" },

  // 👍 APPROVAL
  { face: "🧸", icon: "👍", text: "Good choice!" },
  { face: "🧸", icon: "👌", text: "Excellent pick!" },
  { face: "🧸", icon: "🙌", text: "Great choice!" },
  { face: "🧸", icon: "👏", text: "Well picked!" },
  { face: "🧸", icon: "🤌", text: "Perfect!" },
  { face: "🧸", icon: "✌️", text: "Nice one!" },
  { face: "🧸", icon: "🤝", text: "We approve!" },
  { face: "🧸", icon: "💯", text: "10/10 choice!" },
  { face: "🧸", icon: "⭐", text: "Top pick!" },
  { face: "🧸", icon: "🏆", text: "Winner!" },

  // 😋 FOOD
  { face: "🧸", icon: "😋", text: "Looks delicious!" },
  { face: "🧸", icon: "🤤", text: "I need this!" },
  { face: "🧸", icon: "😮‍💨", text: "So tempting!" },
  { face: "🧸", icon: "🍰", text: "Cake time!" },
  { face: "🧸", icon: "🧁", text: "Sweet pick!" },
  { face: "🧸", icon: "🍪", text: "Cookie magic!" },
  { face: "🧸", icon: "🍓", text: "Berry nice!" },
  { face: "🧸", icon: "🍫", text: "Chocolate heaven!" },
  { face: "🧸", icon: "🥐", text: "Freshly baked vibes!" },
  { face: "🧸", icon: "🍯", text: "Sweet as honey!" },

  // ✨ MAGIC
  { face: "🧸", icon: "✨", text: "Magical!" },
  { face: "🧸", icon: "🌟", text: "This one shines!" },
  { face: "🧸", icon: "💫", text: "Wow!" },
  { face: "🧸", icon: "⭐", text: "Star of the menu!" },
  { face: "🧸", icon: "🌸", text: "Simply beautiful!" },
  { face: "🧸", icon: "🪄", text: "A little magic!" },
  { face: "🧸", icon: "✨", text: "Bakery magic!" },
  { face: "🧸", icon: "🌙", text: "Dreamy!" },
  { face: "🧸", icon: "☁️", text: "Cloud nine!" },
  { face: "🧸", icon: "🎀", text: "So pretty!" },

  // 😂 PLAYFUL
  { face: "🧸", icon: "😂", text: "Okay, I'm sold!" },
  { face: "🧸", icon: "🤣", text: "Can't resist!" },
  { face: "🧸", icon: "😎", text: "Cool pick!" },
  { face: "🧸", icon: "😏", text: "You know what's good!" },
  { face: "🧸", icon: "👀", text: "I see your taste!" },
  { face: "🧸", icon: "🤭", text: "Secret favourite!" },
  { face: "🧸", icon: "😌", text: "Very tempting!" },
  { face: "🧸", icon: "🙈", text: "Don't eat it all!" },
  { face: "🧸", icon: "😜", text: "Treat yourself!" },
  { face: "🧸", icon: "🥹", text: "Too good!" },

  // 🤔 THINKING
  { face: "🧸", icon: "🤔", text: "Thinking about it?" },
  { face: "🧸", icon: "🧐", text: "Interesting choice..." },
  { face: "🧸", icon: "💭", text: "Imagine the first bite!" },
  { face: "🧸", icon: "🤔", text: "Should we order?" },
  { face: "🧸", icon: "👀", text: "Still deciding?" },
  { face: "🧸", icon: "💡", text: "I have an idea!" },
  { face: "🧸", icon: "😶", text: "No words..." },
  { face: "🧸", icon: "🫢", text: "Oh my!" },
  { face: "🧸", icon: "🤯", text: "Mind blown!" },
  { face: "🧸", icon: "😳", text: "Wait... wow!" },

  // 🧁 BAKERY
  { face: "🧸", icon: "🧁", text: "Fresh from the oven!" },
  { face: "🧸", icon: "🍰", text: "Baked with care!" },
  { face: "🧸", icon: "🥄", text: "Mixing up happiness!" },
  { face: "🧸", icon: "🧑‍🍳", text: "Chef approved!" },
  { face: "🧸", icon: "👩‍🍳", text: "Baker approved!" },
  { face: "🧸", icon: "🥣", text: "Made from scratch!" },
  { face: "🧸", icon: "🧈", text: "Butter makes it better!" },
  { face: "🧸", icon: "🍯", text: "Sweet little treat!" },
  { face: "🧸", icon: "🥛", text: "Perfect with a cup of tea!" },
  { face: "🧸", icon: "☕", text: "Tea time!" },

  // 🎉 CELEBRATION
  { face: "🧸", icon: "🎉", text: "Let's celebrate!" },
  { face: "🧸", icon: "🥳", text: "Party time!" },
  { face: "🧸", icon: "🎊", text: "Yay!" },
  { face: "🧸", icon: "🎂", text: "Cake celebration!" },
  { face: "🧸", icon: "🎈", text: "Feeling festive!" },
  { face: "🧸", icon: "🥂", text: "Cheers!" },
  { face: "🧸", icon: "🙌", text: "Let's go!" },
  { face: "🧸", icon: "🎁", text: "Sweet surprise!" },
  { face: "🧸", icon: "🎀", text: "Perfect for gifting!" },
  { face: "🧸", icon: "🌟", text: "Celebration worthy!" },

  // 🌸 CUTE
  { face: "🧸", icon: "🌸", text: "So cute!" },
  { face: "🧸", icon: "🌷", text: "Lovely!" },
  { face: "🧸", icon: "🦋", text: "Butterfly approved!" },
  { face: "🧸", icon: "🐝", text: "Sweet like honey!" },
  { face: "🧸", icon: "🐻", text: "Bear-approved!" },
  { face: "🧸", icon: "🐰", text: "Bunny approved!" },
  { face: "🧸", icon: "🌼", text: "Sunny choice!" },
  { face: "🧸", icon: "🌺", text: "Beautiful!" },
  { face: "🧸", icon: "🍓", text: "Berry adorable!" },
  { face: "🧸", icon: "🎀", text: "Cute pick!" },

  // 💬 FUNNY
  { face: "🧸", icon: "👀", text: "Nobody saw me click..." },
  { face: "🧸", icon: "🤫", text: "This stays between us." },
  { face: "🧸", icon: "😅", text: "Just one more..." },
  { face: "🧸", icon: "🙃", text: "Oops, clicked again!" },
  { face: "🧸", icon: "😏", text: "You have good taste." },
  { face: "🧸", icon: "🤭", text: "Don't tell anyone!" },
  { face: "🧸", icon: "😋", text: "Can I have some?" },
  { face: "🧸", icon: "🥺", text: "Please order me one!" },
  { face: "🧸", icon: "🫶", text: "Sending sweetness!" },
  { face: "🧸", icon: "💅", text: "Excellent taste!" },

  // 🌈 POSITIVE
  { face: "🧸", icon: "☀️", text: "Bright choice!" },
  { face: "🧸", icon: "🌈", text: "Pure happiness!" },
  { face: "🧸", icon: "🌻", text: "What a lovely pick!" },
  { face: "🧸", icon: "💫", text: "Good vibes!" },
  { face: "🧸", icon: "🌿", text: "Simply wonderful!" },
  { face: "🧸", icon: "💛", text: "Made you smile!" },
  { face: "🧸", icon: "🧡", text: "Warm and sweet!" },
  { face: "🧸", icon: "💚", text: "Lovely choice!" },
  { face: "🧸", icon: "💙", text: "That's a winner!" },
  { face: "🧸", icon: "💜", text: "Absolutely delightful!" },

  // 🥰 FINAL SPECIALS
  { face: "🧸", icon: "🥰", text: "I'm in love!" },
  { face: "🧸", icon: "😍", text: "This one is special!" },
  { face: "🧸", icon: "🤩", text: "WOW!" },
  { face: "🧸", icon: "🫶", text: "Made with love ♡" },
  { face: "🧸", icon: "💋", text: "Chef's kiss!" },
  { face: "🧸", icon: "👌", text: "Absolutely perfect!" },
  { face: "🧸", icon: "🔥", text: "This one's hot!" },
  { face: "🧸", icon: "💯", text: "Must try!" },
  { face: "🧸", icon: "🚀", text: "Take my money!" },
  { face: "🧸", icon: "👑", text: "Royal choice!" },
  { face: "🧸", icon: "🏅", text: "Gold medal pick!" },
  { face: "🧸", icon: "💎", text: "Absolute gem!" },
  { face: "🧸", icon: "🌟", text: "Menu superstar!" },
  { face: "🧸", icon: "🎯", text: "Nailed it!" },
  { face: "🧸", icon: "🛍️", text: "Add to the order!" },
  { face: "🧸", icon: "📸", text: "Instagram worthy!" },
  { face: "🧸", icon: "💌", text: "A sweet message!" },
  { face: "🧸", icon: "🫰", text: "Worth every bite!" },
  { face: "🧸", icon: "🤗", text: "Sending a hug!" },
  { face: "🧸", icon: "🥹", text: "I'm emotional!" },
];

export default function BakeryReaction({
  visible,
  reaction,
}: BakeryReactionProps) {
  const reducedMotion = useReducedMotion();

  const item = reactions[reaction % reactions.length];

  return (
    <motion.div
      initial={false}
      animate={
        visible
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {
              opacity: 0,
              y: 25,
              scale: 0.8,
            }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.3,
        ease: "easeOut",
      }}
      className="pointer-events-none absolute bottom-20 left-1/2 z-30 -translate-x-1/2"
    >
      <div className="relative flex items-center gap-2 rounded-full border border-caramel/20 bg-cream px-3 py-2 shadow-xl shadow-choc/15">
        <motion.span
          animate={
            visible && !reducedMotion
              ? {
                  y: [0, -6, 0],
                  rotate: [-5, 5, -5],
                }
              : undefined
          }
          transition={{
            duration: 0.7,
            repeat: visible && !reducedMotion ? 2 : 0,
          }}
          className="text-3xl"
        >
          {item.face}
        </motion.span>

        <motion.span
          key={`${reaction}-${item.icon}`}
          initial={
            reducedMotion
              ? undefined
              : { scale: 0.5, rotate: -15 }
          }
          animate={
            reducedMotion
              ? undefined
              : { scale: 1, rotate: 0 }
          }
          className="text-xl"
        >
          {item.icon}
        </motion.span>

        <span className="whitespace-nowrap font-hand text-lg font-bold text-choc">
          {item.text}
        </span>

        <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-caramel/20 bg-cream" />
      </div>
    </motion.div>
  );
}