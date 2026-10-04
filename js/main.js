<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clase 01 - Saludo Match</title>
    <link rel="stylesheet" href="../../css/style.css">
    <style>
        .game-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .game-title {
            font-size: 1.8em;
            color: #333;
        }
        
        .greeting-pool {
            background: #f0f0f0;
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
            min-height: 100px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            border: 2px dashed #ccc;
        }
        
        .greeting-card {
            padding: 15px 25px;
            background: white;
            border: 2px solid #667eea;
            border-radius: 10px;
            cursor: grab;
            font-size: 1.1em;
            font-weight: 500;
            transition: all 0.3s;
            user-select: none;
        }
        
        .greeting-card:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        .greeting-card.dragging {
            opacity: 0.5;
            transform: scale(0.95);
        }
        
        .greeting-card.placed {
            opacity: 0.6;
            cursor: default;
            background: #e0e0e0;
            transform: scale(0.95);
        }
        
        .drop-zones {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .drop-zone {
            min-height: 200px;
            border: 3px dashed #aaa;
            border-radius: 15px;
            padding: 20px;
            background: #fafafa;
            transition: all 0.3s;
        }
        
        .drop-zone h3 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        
        .drop-zone .subtitle {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 15px;
        }
        
        .drop-zone.dragover {
            background: #e3f2fd;
            border-color: #1976d2;
            transform: scale(1.02);
        }
        
        .drop-zone .items-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            min-height: 80px;
        }
        
        .drop-zone .items-container .greeting-card {
            cursor: default;
            background: #e8f5e9;
            border-color: #28a745;
        }
        
        .controls {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .score {
            font-size: 1.2em;
            font-weight: 600;
            color: #333;
            padding: 10px 20px;
            background: #f0f0f0;
            border-radius: 10px;
        }
        
        .feedback {
            margin: 20px 0;
        }
        
        .btn-back {
            display: inline-block;
            padding: 10px 20px;
            background: #6c757d;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s;
        }
        
        .btn-back:hover {
            background: #5a6268;
            transform: translateX(-3px);
        }
        
        @media (max-width: 768px) {
            .drop-zones {
                grid-template-columns: 1fr;
            }
            
            .game-title {
                font-size: 1.4em;
            }
            
            .greeting-card {
                padding: 10px 15px;
                font-size: 0.9em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="game-container">
            <!-- Header -->
            <div class="game-header">
                <div>
                    <a href="../../index.html" class="btn-back">← Volver al menú</a>
                    <h1 class="game-title">🎯 Clase 01: Saludo Match</h1>
                    <p style="color: #666;">Arrastra cada saludo a la categoría correcta (formal o informal)</p>
                </div>
                <div class="score" id="score-display">
                    ✅ Aciertos: <span id="score-count">0</span>/<span id="total-count">8</span>
                </div>
            </div>

            <!-- Pool de saludos -->
            <div class="greeting-pool" id="greeting-pool">
                <!-- Generado por JavaScript -->
            </div>

            <!-- Zonas de drop -->
            <div class="drop-zones">
                <div class="drop-zone" id="formal-zone" data-category="formal">
                    <h3>📌 FORMAL</h3>
                    <p class="subtitle">Good morning, Good afternoon, Good evening, Hello</p>
                    <div class="items-container" id="formal-items"></div>
                </div>
                <div class="drop-zone" id="informal-zone" data-category="informal">
                    <h3>📌 INFORMAL</h3>
                    <p class="subtitle">Hi, Hey, What's up?, Yo!</p>
                    <div class="items-container" id="informal-items"></div>
                </div>
            </div>

            <!-- Controles -->
            <div class="controls">
                <button class="btn btn-success" id="check-btn">✅ Verificar respuestas</button>
                <button class="btn btn-warning" id="reset-btn">🔄 Reiniciar</button>
                <button class="btn btn-primary" id="hint-btn">💡 Pista</button>
            </div>

            <!-- Feedback -->
            <div id="feedback" class="feedback" style="display: none;"></div>
        </div>
    </div>

    <script src="../../js/main.js"></script>
    <script>
        // ============================================
        // CONFIGURACIÓN DE LA ACTIVIDAD
        // ============================================
        const CLASE = '01';
        
        const saludos = [
            { text: 'Good morning', category: 'formal' },
            { text: 'Good afternoon', category: 'formal' },
            { text: 'Good evening', category: 'formal' },
            { text: 'Hello', category: 'formal' },
            { text: 'Hi', category: 'informal' },
            { text: 'Hey', category: 'informal' },
            { text: "What's up?", category: 'informal' },
            { text: 'Yo!', category: 'informal' }
        ];

        // ============================================
        // ESTADO DEL JUEGO
        // ============================================
        let draggedItem = null;
        let score = { correct: 0, total: saludos.length };
        let isCompleted = false;
        
        // ============================================
        // FUNCIONES PRINCIPALES
        // ============================================
        
        // Mezclar array
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Renderizar saludos
        function renderGreetings() {
            const pool = document.getElementById('greeting-pool');
            pool.innerHTML = '';
            const shuffled = shuffle([...saludos]);
            
            shuffled.forEach((g, index) => {
                const card = document.createElement('div');
                card.className = 'greeting-card';
                card.textContent = g.text;
                card.dataset.category = g.category;
                card.dataset.placed = 'false';
                card.dataset.originalIndex = index;
                card.draggable = true;
                
                card.addEventListener('dragstart', (e) => {
                    if (card.dataset.placed === 'true') {
                        e.preventDefault();
                        return;
                    }
                    draggedItem = card;
                    card.classList.add('dragging');
                    e.dataTransfer.effectAllowed = 'move';
                });
                
                card.addEventListener('dragend', () => {
                    card.classList.remove('dragging');
                    draggedItem = null;
                });
                
                pool.appendChild(card);
            });
        }

        // Configurar zonas de drop
        function setupDropZones() {
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    if (draggedItem && draggedItem.dataset.placed === 'false') {
                        zone.classList.add('dragover');
                    }
                });
                
                zone.addEventListener('dragleave', () => {
                    zone.classList.remove('dragover');
                });
                
                zone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    zone.classList.remove('dragover');
                    
                    if (!draggedItem || draggedItem.dataset.placed === 'true') return;
                    
                    const category = zone.dataset.category;
                    const itemsContainer = zone.querySelector('.items-container');
                    
                    // Verificar si es correcto
                    if (draggedItem.dataset.category === category) {
                        // Correcto
                        draggedItem.dataset.placed = 'true';
                        draggedItem.classList.add('placed');
                        draggedItem.draggable = false;
                        
                        // Crear copia en la zona de drop
                        const clone = draggedItem.cloneNode(true);
                        clone.draggable = false;
                        clone.classList.remove('placed');
                        clone.classList.add('placed');
                        clone.dataset.placed = 'true';
                        itemsContainer.appendChild(clone);
                        
                        // Ocultar original
                        draggedItem.style.display = 'none';
                        
                        score.correct++;
                        updateScore();
                        
                        // Verificar si completó
                        if (score.correct === score.total) {
                            completarActividad(CLASE, `${score.correct}/${score.total}`);
                            isCompleted = true;
                            mostrarFeedback('🎉 ¡Excelente! Has clasificado todos los saludos correctamente.', 'success');
                        }
                    } else {
                        // Error - animación
                        draggedItem.style.border = '3px solid red';
                        draggedItem.style.backgroundColor = '#ffebee';
                        setTimeout(() => {
                            draggedItem.style.border = '2px solid #667eea';
                            draggedItem.style.backgroundColor = 'white';
                        }, 500);
                        mostrarFeedback('❌ ¡Ups! Ese saludo no pertenece a esta categoría. Intenta de nuevo.', 'error');
                    }
                });
            });
        }

        // Actualizar puntaje
        function updateScore() {
            document.getElementById('score-count').textContent = score.correct;
            document.getElementById('total-count').textContent = score.total;
            
            const progress = (score.correct / score.total) * 100;
            document.querySelector('.score').style.background = 
                progress === 100 ? '#d4edda' : '#f0f0f0';
        }

        // Verificar respuestas
        function checkAll() {
            if (score.correct === score.total) {
                mostrarFeedback('🎉 ¡Perfecto! Ya habías completado todas las clasificaciones.', 'success');
                return;
            }
            
            const total = document.querySelectorAll('.greeting-card').length;
            const placed = document.querySelectorAll('.greeting-card[data-placed="true"]').length;
            
            if (placed === total) {
                mostrarFeedback('🎉 ¡Excelente! Has clasificado todos los saludos correctamente.', 'success');
                completarActividad(CLASE, `${score.correct}/${score.total}`);
                isCompleted = true;
            } else {
                const faltan = total - placed;
                mostrarFeedback(`⚠️ Te faltan ${faltan} saludo(s) por clasificar. ¡Sigue intentando!`, 'warning');
            }
        }

        // Reiniciar juego
        function resetGame() {
            score.correct = 0;
            isCompleted = false;
            updateScore();
            
            document.getElementById('feedback').style.display = 'none';
            
            // Limpiar zonas de drop
            document.querySelectorAll('.items-container').forEach(container => {
                container.innerHTML = '';
            });
            
            // Limpiar pool y renderizar de nuevo
            const pool = document.getElementById('greeting-pool');
            pool.innerHTML = '';
            renderGreetings();
            
            // Restaurar visibilidad de todas las tarjetas
            document.querySelectorAll('.greeting-card').forEach(card => {
                card.style.display = '';
                card.dataset.placed = 'false';
                card.classList.remove('placed');
                card.draggable = true;
                card.style.border = '2px solid #667eea';
                card.style.backgroundColor = 'white';
            });
            
            setupDropZones();
            mostrarFeedback('🔄 Juego reiniciado. ¡Intenta de nuevo!', 'warning');
        }

        // Mostrar pista
        function showHint() {
            const unplaced = document.querySelectorAll('.greeting-card[data-placed="false"]');
            if (unplaced.length === 0) {
                mostrarFeedback('🎯 ¡Ya clasificaste todos los saludos!', 'success');
                return;
            }
            
            // Seleccionar uno aleatorio
            const random = unplaced[Math.floor(Math.random() * unplaced.length)];
            const category = random.dataset.category;
            const categoryName = category === 'formal' ? 'FORMAL' : 'INFORMAL';
            
            mostrarFeedback(`💡 Pista: "${random.textContent}" es de categoría ${categoryName}`, 'warning');
        }

        // ============================================
        // INICIALIZACIÓN
        // ============================================
        function init() {
            renderGreetings();
            setupDropZones();
            updateScore();
            
            // Event listeners
            document.getElementById('check-btn').addEventListener('click', checkAll);
            document.getElementById('reset-btn').addEventListener('click', resetGame);
            document.getElementById('hint-btn').addEventListener('click', showHint);
            
            // Verificar si ya estaba completada
            if (verificarCompletada(CLASE)) {
                document.querySelector('.score').style.background = '#d4edda';
                mostrarFeedback('🌟 ¡Ya completaste esta actividad anteriormente!', 'success');
            }
        }

        // Ejecutar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>