<template>
    <h1>Caustics</h1>

    <h2>nvm fuck this idk i forgot school level physics</h2>

    <div id="parameters" class="card mb-8">
        <div class="flex justify-between gap-4 px-8">
            <!-- Wavelength: [380, 780] -->
            <div class="flex flex-col gap-2 items-center">
                <label for="wavelength-input"
                    ><span>Wavelength (</span>
                    <span class="font-mono">{{ state['parameters']['wavelength'] }}</span>
                    <span class="font-mono">nm)</span>
                </label>

                <input
                    type="range"
                    id="wavelength-input"
                    name="wavelength"
                    min="380"
                    max="780"
                    v-model="state['parameters']['wavelength']"
                    :style="{
                        '--color': state['scene']['lightColor'],
                    }"
                />
            </div>

            <!-- Height: [0, 1] -->
            <div class="flex flex-col gap-2 items-center">
                <label for="height-input">
                    <span>Height (</span>
                    <span class="font-mono">{{ Number(state['parameters']['height']) > 0 ? '+' : '-' }}</span>
                    <span class="font-mono">{{ Math.abs(Number(state['parameters']['height'])).toFixed(3).slice(1) }}</span>
                    <span>R)</span>
                </label>

                <input type="range" id="height-input" name="height" min="-0.999" max="0.999" step="0.001" v-model="state['parameters']['height']" />
            </div>

            <!-- Outside medium: {{ state['parameters']['outsideMedium'] }} -->
            <div class="flex flex-col gap-2 items-center">
                <label for="outside-medium-input">Outside medium</label>

                <select id="outside-medium-input" name="outside-medium" v-model="state['parameters']['outsideMedium']">
                    <option v-for="medium in data['mediums']" :value="medium['id']">{{ medium['name'] }}</option>
                </select>
            </div>

            <!-- Inside medium: {{ state['parameters']['insideMedium'] }} -->
            <div class="flex flex-col gap-2 items-center">
                <label for="inside-medium-input">Inside medium</label>

                <select id="inside-medium-input" name="inside-medium" v-model="state['parameters']['insideMedium']">
                    <option v-for="medium in data['mediums']" :value="medium['id']">{{ medium['name'] }}</option>
                </select>
            </div>
        </div>
    </div>

    <template v-if="state['canvas']['width']">
        <canvas id="canvas" class="card" :width="state['canvas']['width']" :height="state['canvas']['height']"></canvas>
    </template>
</template>

<script setup>
    // Data
    const data = {
        mediums: {
            vaccum: {
                id: 'vaccum',
                name: 'Vaccum',
                refractiveIndex: 1,
                color: '#F6F4DE',
            },
            air: {
                id: 'air',
                name: 'Air',
                refractiveIndex: 1.000273,
                color: '#BADEFB',
            },
            ice: {
                id: 'ice',
                name: 'Ice',
                refractiveIndex: 1.31,
                color: '#AAAAFF',
            },
            water: {
                id: 'water',
                name: 'Water',
                refractiveIndex: 1.333,
                color: '#0000FF',
            },
            ethanol: {
                id: 'ethanol',
                name: 'Ethanol',
                refractiveIndex: 1.36,
                color: '#BFC5CD',
            },
            vegetableOil: {
                id: 'vegetableOil',
                name: 'Vegetable Oil',
                refractiveIndex: 1.47,
                color: '#F4C601',
            },
            glass: {
                id: 'glass',
                name: 'Glass',
                refractiveIndex: 1.5,
                color: '#808080',
            },
            diamond: {
                id: 'diamond',
                name: 'Diamond',
                refractiveIndex: 2.417,
                color: '#7DA7D9',
            },
        },
    }
    // State
    const state = reactive({
        debug: true,
        canvas: {
            canvas: null,
            ctx: null,
            width: null,
            height: null,
        },
        parameters: {
            wavelength: 700,
            height: 0,
            outsideMedium: 'air',
            insideMedium: 'water',
        },
        scene: {
            lightColor: 'rgb(255, 0, 0)',
            circle: [0, 0, 0], // [x, y, r]
            height: 0,
            n1: 1,
            n2: 1,
        },
    })

    // Watch to set `state['scene']['colors']`
    watchEffect(function () {
        const [r, g, b] = wavelengthToRGB(state['parameters']['wavelength'])
        state['scene']['lightColor'] = `rgb(${r}, ${g}, ${b})`
    })

    // Watch to set `state['scene']['circle']`
    watchEffect(function () {
        const canvasCenterX = state['canvas']['width'] * 0.5
        const canvasCenterY = state['canvas']['height'] * 0.5

        const circleCenterX = state['canvas']['width'] * 0.75
        const circleCenterY = state['canvas']['height'] * 0.5
        const circleRadius = state['canvas']['height'] * 0.4

        // Coordinates of circle
        state['scene']['circle'] = [circleCenterX, circleCenterY, circleRadius]

        // Height of incident ray
        state['scene']['height'] = canvasCenterY - state['parameters']['height'] * circleRadius
    })

    // Watch to set `state['scene']['n1']`
    watchEffect(function () {
        state['scene']['n1'] = data['mediums'][state['parameters']['outsideMedium']]['refractiveIndex']
    })

    // Watch to set `state['scene']['n2']`
    watchEffect(function () {
        state['scene']['n2'] = data['mediums'][state['parameters']['insideMedium']]['refractiveIndex']
    })

    // Watch state['scene'] to reset canvas
    watch(state['scene'], function () {
        resetCanvas()
    })

    // Functions
    function wavelengthToRGB(wavelength) {
        let r, g, b

        if (wavelength < 380 || wavelength >= 781) {
            return [0, 0, 0]
        }

        if (wavelength >= 380 && wavelength < 440) {
            r = -(wavelength - 440) / (440 - 380)
            g = 0
            b = 1
        } else if (wavelength >= 440 && wavelength < 490) {
            r = 0
            g = (wavelength - 440) / (490 - 440)
            b = 1
        } else if (wavelength >= 490 && wavelength < 510) {
            r = 0
            g = 1
            b = -(wavelength - 510) / (510 - 490)
        } else if (wavelength >= 510 && wavelength < 580) {
            r = (wavelength - 510) / (580 - 510)
            g = 1
            b = 0
        } else if (wavelength >= 580 && wavelength < 645) {
            r = 1
            g = -(wavelength - 645) / (645 - 580)
            b = 0
        } else if (wavelength >= 645 && wavelength < 781) {
            r = 1
            g = 0
            b = 0
        }

        // Let the intensity fall off near the vision limits
        const γ = 0.8
        let α = 0

        if (wavelength >= 380 && wavelength < 420) {
            α = 0.3 + (0.7 * (wavelength - 380)) / (420 - 380)
        } else if (wavelength >= 420 && wavelength < 701) {
            α = 1.0
        } else if (wavelength >= 701 && wavelength < 781) {
            α = 0.3 + (0.7 * (780 - wavelength)) / (780 - 700)
        }

        r = Math.round(255 * Math.pow(r * α, γ))
        g = Math.round(255 * Math.pow(g * α, γ))
        b = Math.round(255 * Math.pow(b * α, γ))

        return [r, g, b]
    }

    // Methods
    function resetCanvas() {
        const container = document.getElementById('main')

        // Get width of container
        const width = container.offsetWidth

        state['canvas']['width'] = width
        state['canvas']['height'] = width / 2

        let canvas = null
        let canvasInterval = setInterval(function () {
            canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')

            if (canvas) {
                clearInterval(canvasInterval)

                state['canvas']['canvas'] = canvas
                state['canvas']['ctx'] = ctx

                draw()
            }
        }, 100)
    }

    function drawAxis(value, axis = 'x', color = '#000000') {
        if (!state['debug']) {
            return
        }

        const ctx = state['canvas']['ctx']

        ctx.beginPath()

        if (axis === 'y') {
            ctx.moveTo(0, value)
            ctx.lineTo(state['canvas']['width'], value)
        } else {
            ctx.moveTo(value, 0)
            ctx.lineTo(value, state['canvas']['height'])
        }

        ctx.strokeStyle = color
        ctx.lineWidth = 2

        ctx.stroke()
    }

    function drawX(x, y, size = 5, color = '#000000') {
        if (!state['debug']) {
            return
        }

        const ctx = state['canvas']['ctx']

        ctx.beginPath()
        ctx.setLineDash([2])

        ctx.strokeStyle = color
        ctx.lineWidth = 2

        ctx.moveTo(x - size, y - size)
        ctx.lineTo(x + size, y + size)
        ctx.stroke()

        ctx.moveTo(x - size, y + size)
        ctx.lineTo(x + size, y - size)
        ctx.stroke()

        ctx.setLineDash([])
    }

    function drawLine([x1, y1], [x2, y2], color = '#000000') {
        const ctx = state['canvas']['ctx']

        ctx.beginPath()

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        // dotted

        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }

    function drawCircle(x, y, r, color = '#000000', fill = false) {
        const ctx = state['canvas']['ctx']

        ctx.beginPath()

        ctx.strokeStyle = color
        ctx.fillStyle = color + '30'
        ctx.lineWidth = 2

        ctx.arc(x, y, r, 0, 2 * Math.PI)

        if (fill) {
            ctx.fill()
        } else {
            ctx.stroke()
        }
    }

    function getSlope(x1, y1, x2, y2) {
        return (y2 - y1) / (x2 - x1)
    }

    function getAngleBetween([A_x1, A_y1, A_x2, A_y2], [B_x1, B_y1, B_x2, B_y2]) {
        const A_slope = getSlope(A_x1, A_y1, A_x2, A_y2)
        const B_slope = getSlope(B_x1, B_y1, B_x2, B_y2)

        return Math.atan((B_slope - A_slope) / (1 + A_slope * B_slope))
    }

    function draw() {
        const n1 = state['scene']['n1']
        const n2 = state['scene']['n2']
        const c1 = data['mediums'][state['parameters']['outsideMedium']]['color']
        const c2 = data['mediums'][state['parameters']['insideMedium']]['color']

        const ctx = state['canvas']['ctx']
        const h = state['scene']['height']
        const c = state['scene']['lightColor']
        const [C_x, C_y, C_r] = state['scene']['circle']

        // =====

        // Clear the canvas and set color to c1
        ctx.clearRect(0, 0, state['canvas']['width'], state['canvas']['height'])
        ctx.fillStyle = c1
        ctx.fillRect(0, 0, state['canvas']['width'], state['canvas']['height'])

        drawCircle(C_x, C_y, C_r, c2, true)

        // Find the intersection of the light ray with the circle and draw a vertical line
        const a = h - C_y
        const b = Math.sqrt(C_r * C_r - a * a)

        const i1_x = C_x - b
        const i1_y = C_y + a

        // drawX(int1x, h, 80)

        // Draw the incident ray up until the intersection
        drawLine([0, h], [i1_x, i1_y], c)

        // Find the angle of incidence
        // drawLine([i1_x, i1_y], [C_x, C_y], '#000000')
        const sinα1 = (i1_y - C_y) / C_r
        const α1 = -(Math.asin(sinα1) || 0)
        drawX(i1_x, i1_y, 10) // α1, β1

        console.log({ α1, deg: (α1 * 180) / Math.PI })

        // Find the angle of refraction
        const sinβ1 = (n1 * sinα1) / n2
        const β1 = Math.asin(sinβ1) || 0

        console.log({ β1, deg: (β1 * 180) / Math.PI })

        // Draw the refracted ray
        const i2_x = C_x + C_r * Math.cos(β1)
        const i2_y = C_y + C_r * Math.sin(β1)
        drawLine([i1_x, i1_y], [i2_x, i2_y], c)
        // drawAxis(i2_y, 'y')
        // drawLine([C_x, C_y], [i2_x, i2_y], 'black')

        // Find the angle of incidence
        const α2 = -getAngleBetween([i1_x, i1_y, i2_x, i2_y], [C_x, C_y, i2_x, i2_y])
        drawX(i2_x, i2_y, 10) // α2

        console.log({ α2, deg: (α2 * 180) / Math.PI })

        // Find the angle of refraction
        const sinβ2 = (n2 * Math.sin(α2)) / n1
        const β2 = Math.asin(sinβ2) || 0

        console.log({ β2, deg: (β2 * 180) / Math.PI })

        // Draw the refracted ray
        const i3_x = C_x + C_r * Math.cos(β2)
        const i3_y = C_y + C_r * Math.sin(β2)
        drawLine([i2_x, i2_y], [i3_x, i3_y], c)
        // drawAxis(i3_y, 'y')

        // I need someone smarter than me...
    }

    onMounted(function () {
        resetCanvas()
    })
</script>

<style scoped lang="scss">
    input[type='range'] {
        overflow: hidden;
        -webkit-appearance: none;
        border-radius: 0.4rem;
        width: 100%;

        &#wavelength-input {
            background-color: var(--color);
        }

        &#height-input {
            background-color: #60c060;
        }

        &::-webkit-slider-runnable-track {
            border-radius: 0.8rem;
            -webkit-appearance: none;
            margin-top: 0px;
            border-radius: 0.4rem;
        }

        &::-webkit-slider-thumb {
            width: 0.8rem;
            -webkit-appearance: none;
            height: 0.8rem;
            cursor: ew-resize;
            border-radius: 100%;
            background: white;
        }
    }

    select {
        width: 100%;
        border-radius: 0.4rem;
        background-color: #f0f0f0;
        transform: translateY(-0.4rem);
    }

    canvas {
        padding: 0;
    }
</style>
