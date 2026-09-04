<template>
    <figure class="constellation">
        <div class="sky">
            <svg class="sky-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line
                    v-for="(line, index) in lines"
                    :key="index"
                    :class="['line', `g${line.group}`]"
                    :x1="line.x1"
                    :y1="line.y1"
                    :x2="line.x2"
                    :y2="line.y2"
                    :style="{ '--i': index }"
                    pathLength="1"
                />
            </svg>

            <span
                v-for="label in labels"
                :key="label.title"
                :class="['cluster-label', label.align]"
                :style="{ left: `${label.x}%`, top: `${label.y}%` }"
                aria-hidden="true"
            >
                {{ label.title }}
            </span>

            <ul class="stars">
                <li
                    v-for="star in stars"
                    :key="star.name"
                    :class="['star', `g${star.group}`, star.major ? 'major' : 'minor']"
                    :style="{
                        'left': `${star.x}%`,
                        'top': `${star.y}%`,
                        '--brand': star.color,
                        '--i': star.order,
                        '--twinkle-t': `${star.twinkleTime}s`,
                        '--twinkle-d': `${star.twinkleDelay}s`,
                    }"
                >
                    <NuxtLink v-if="star.major" to="/resume#skills" :aria-label="star.name">
                        <span v-if="star.img" class="glyph glyph-svg" v-html="skillIcons[star.img]"></span>
                        <Icon v-else :name="star.icon" class="glyph" />
                        <span class="star-name" aria-hidden="true">{{ star.name }}</span>
                    </NuxtLink>
                    <span v-else class="dot" :title="star.name"></span>
                </li>
            </ul>
        </div>
    </figure>
</template>

<script setup>
import { skills } from '~/data/skills'
import { skillIcons } from '~/composables/skillIcons'

const ANCHORS = [
    { x: 30, y: 34, r: 22, label: { x: 30, y: 7.5, align: 'center' } }, // Back-end
    { x: 76, y: 20, r: 13, label: { x: 76, y: 38, align: 'center' } }, // Front-end
    { x: 80, y: 64, r: 12, label: { x: 80, y: 81, align: 'center' } }, // Databases
    { x: 50, y: 74, r: 14, label: { x: 66, y: 93, align: 'right', text: 'AI & data' } }, // AI & Data Science
    { x: 14, y: 76, r: 12, label: { x: 2, y: 93, align: 'left', text: 'Cloud & DevOps' } }, // Cloud, DevOps, & Systems
]

const BOX_RATIO = 1 // height / width of the sky box (square)
const MIN_DISTANCE = 6.5 // percent of width between two stars
const PLACEMENT_TRIES = 60

// Deterministic PRNG so server and client render the same sky.
function mulberry32(seed) {
    let a = seed >>> 0
    return function () {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function hashString(text) {
    let hash = 2166136261
    for (const char of text) {
        hash ^= char.charCodeAt(0)
        hash = Math.imul(hash, 16777619)
    }
    return hash >>> 0
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function round(value) {
    return Math.round(value * 100) / 100
}

function distance(a, b) {
    const dx = a.x - b.x
    const dy = (a.y - b.y) * BOX_RATIO
    return Math.sqrt(dx * dx + dy * dy)
}

function placeStars() {
    const placed = []

    skills.forEach(function (group, groupIndex) {
        const anchor = ANCHORS[groupIndex]
        if (!anchor) return

        const random = mulberry32(hashString(group.title))
        const icons = group.icons.filter(function (icon) {
            return icon.showVignette
        })

        icons.forEach(function (icon) {
            let best = null

            for (let attempt = 0; attempt < PLACEMENT_TRIES; attempt++) {
                const radius = anchor.r * Math.sqrt(random())
                const angle = random() * Math.PI * 2
                const candidate = {
                    x: clamp(anchor.x + radius * Math.cos(angle), 4, 96),
                    y: clamp(anchor.y + (radius * Math.sin(angle)) / BOX_RATIO, 6, 90),
                }

                let nearest = Infinity
                for (const other of placed) {
                    nearest = Math.min(nearest, distance(other, candidate))
                }

                if (!best || nearest > best.nearest) {
                    best = { ...candidate, nearest }
                }
                if (nearest >= MIN_DISTANCE) break
            }

            placed.push({
                name: icon.name,
                icon: icon.icon,
                img: icon.img,
                color: icon.color,
                major: Boolean(icon.showSkills),
                group: groupIndex,
                order: placed.length,
                x: round(best.x),
                y: round(best.y),
                twinkleTime: round(3 + random() * 4),
                twinkleDelay: round(-random() * 6),
            })
        })
    })

    return placed
}

// Minimum spanning tree (Prim) draws each cluster as one connected figure.
function spanningTree(points) {
    if (points.length < 2) return []

    const inTree = [points[0]]
    const rest = points.slice(1)
    const edges = []

    while (rest.length) {
        let bestEdge = null

        for (const a of inTree) {
            rest.forEach(function (b, restIndex) {
                const d = distance(a, b)
                if (!bestEdge || d < bestEdge.d) {
                    bestEdge = { a, b, restIndex, d }
                }
            })
        }

        edges.push([bestEdge.a, bestEdge.b])
        inTree.push(bestEdge.b)
        rest.splice(bestEdge.restIndex, 1)
    }

    return edges
}

const stars = placeStars()

const lines = ANCHORS.flatMap(function (_, groupIndex) {
    const members = stars.filter(function (star) {
        return star.group === groupIndex
    })

    return spanningTree(members).map(function ([a, b]) {
        return {
            group: groupIndex,
            x1: a.x,
            y1: a.y * BOX_RATIO,
            x2: b.x,
            y2: b.y * BOX_RATIO,
        }
    })
})

const labels = ANCHORS.map(function (anchor, groupIndex) {
    return {
        ...anchor.label,
        title: anchor.label.text || skills[groupIndex].title,
    }
})
</script>

<style scoped lang="scss">
.constellation {
    margin: 0;
    width: 100%;
}

.sky {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
}

.sky-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;

    .line {
        stroke: var(--star-dim);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
        opacity: 0.4;
        stroke-dasharray: 1;
        stroke-dashoffset: 0;
        transition:
            opacity 300ms ease,
            stroke 300ms ease;
        animation: draw 900ms ease-out both;
        animation-delay: calc(700ms + var(--i) * 40ms);
    }
}

.stars {
    list-style: none;
    margin: 0;
    padding: 0;
}

.star {
    position: absolute;
    transform: translate(-50%, -50%);
    animation: rise 600ms ease-out both;
    animation-delay: calc(var(--i) * 28ms);

    a,
    .dot {
        display: grid;
        place-items: center;
    }

    &.major a {
        position: relative;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        color: var(--star);
        opacity: 0.85;
        text-decoration: none;
        animation: twinkle var(--twinkle-t) ease-in-out infinite;
        animation-delay: var(--twinkle-d);

        .glyph {
            display: block;
            width: 1.125rem;
            height: 1.125rem;
            font-size: 1.125rem;
            line-height: 1;
            transition:
                transform 300ms ease,
                color 300ms ease,
                filter 300ms ease;
        }

        .glyph-svg {
            filter: grayscale(1) brightness(1.7);

            :deep(svg) {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .star-name {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 0.15rem 0.45rem;
            border-radius: 0.25rem;
            background: rgba(10, 14, 42, 0.9);
            font-family: var(--font-mono);
            font-size: 0.625rem;
            letter-spacing: 0.04em;
            white-space: nowrap;
            color: var(--star);
            opacity: 0;
            pointer-events: none;
            transition: opacity 200ms ease;
        }

        &:hover,
        &:focus-visible {
            opacity: 1;
            z-index: 2;
            animation: none;

            .glyph {
                color: var(--brand);
                transform: scale(1.5);
            }

            .glyph-svg {
                filter: none;
            }

            .star-name {
                opacity: 1;
            }
        }

        &:focus-visible {
            outline: 2px solid var(--color-primary-light);
            outline-offset: 2px;
        }
    }

    &.minor .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--star);
        opacity: 0.55;
        animation: twinkle var(--twinkle-t) ease-in-out infinite;
        animation-delay: var(--twinkle-d);
    }
}

.cluster-label {
    position: absolute;
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--star-dim);
    pointer-events: none;
    animation: fade-in 800ms ease-out both;
    animation-delay: 1900ms;

    &.center {
        transform: translateX(-50%);
    }

    &.right {
        transform: translateX(-100%);
    }
}

// Hovering a star lights up its whole constellation.
@for $g from 0 through 4 {
    .sky:has(.star.g#{$g} a:hover, .star.g#{$g} a:focus-visible) .line.g#{$g} {
        opacity: 0.9;
        stroke: var(--star);
    }
}

@keyframes rise {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.4);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes draw {
    from {
        stroke-dashoffset: 1;
    }
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes twinkle {
    0%,
    100% {
        opacity: 0.85;
    }
    50% {
        opacity: 0.4;
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {
    .star,
    .star a,
    .star .dot,
    .line,
    .cluster-label {
        animation: none !important;
    }
}
</style>
