import { JSX } from "react";
import './Home.css'
function Home():JSX.Element{
    return(
        <>
            <figure className="relative font-black text-center">
                <img className="w-full img-height" src="home.jpg" alt="home" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="tittle font-black text-9xl max-lg:text-6xl">HOTEL SYSTEM</h2>
                    <h2 className="subtittle font-black text-4xl max-lg:text-2xl">Rest and comfort in every corner. Your home away from home</h2>
                </div>
            </figure>
            <section>
                <h2>Introducción</h2>
                <p>Los videojuegos han pasado de ser una simple forma de entretenimiento a convertirse en una de las industrias más influyentes del mundo. Con avances en tecnología, diseño y mecánicas, los videojuegos ofrecen experiencias que van desde la educación hasta la simulación de la vida real.</p>
                <p>Hoy en día, millones de jóvenes alrededor del mundo dedican varias horas a la semana a jugar videojuegos. Sin embargo, esto ha generado un debate sobre si los videojuegos tienen un impacto positivo o negativo en la juventud.</p>
            </section>

            <section>
                <h2>Historia de los Videojuegos</h2>
                <p>Los videojuegos comenzaron en la década de 1950 con experimentos tecnológicos en universidades. En los años 70, con la llegada de consolas como Atari, los videojuegos se popularizaron. Durante los años 80 y 90, compañías como Nintendo y Sega revolucionaron la industria con franquicias icónicas como Mario y Sonic.</p>
                <p>En la actualidad, los videojuegos han evolucionado hasta convertirse en experiencias interactivas con gráficos realistas, inteligencia artificial avanzada y juegos en línea con miles de jugadores simultáneamente.</p>
            </section>

            <section>
                <h2>Beneficios de los Videojuegos</h2>
                <h3>1. Desarrollo Cognitivo</h3>
                <p>Los videojuegos pueden mejorar habilidades cognitivas como la memoria, la capacidad de resolución de problemas y la toma de decisiones. Estudios han demostrado que los juegos de estrategia y rompecabezas pueden fortalecer la función cerebral.</p>

                <h3>2. Coordinación Mano-Ojo</h3>
                <p>Juegos que requieren reflejos rápidos, como los de disparos en primera persona, mejoran la coordinación entre lo que se ve en la pantalla y los movimientos del cuerpo.</p>

                <h3>3. Desarrollo Social</h3>
                <p>Muchos videojuegos fomentan la interacción social. Los juegos multijugador en línea permiten a los jugadores trabajar en equipo, comunicarse y resolver problemas juntos.</p>

                <h3>4. Creatividad e Imaginación</h3>
                <p>Juegos como Minecraft han sido utilizados en entornos educativos para fomentar la creatividad, el diseño y la resolución de problemas.</p>

                <h3>5. Reducción del Estrés</h3>
                <p>Los videojuegos pueden actuar como una vía de escape del estrés diario. Juegos relajantes y narrativos pueden ayudar a los jóvenes a gestionar sus emociones.</p>
            </section>

            <section>
                <h2>Riesgos de los Videojuegos</h2>
                <h3>1. Adicción</h3>
                <p>El uso excesivo de videojuegos puede generar adicción, lo que afecta la vida social, el rendimiento académico y la salud mental.</p>

                <h3>2. Sedentarismo</h3>
                <p>Pasar muchas horas sentado jugando puede provocar problemas de salud como obesidad y problemas musculares.</p>

                <h3>3. Impacto en el Comportamiento</h3>
                <p>Algunos estudios sugieren que la exposición prolongada a videojuegos violentos puede influir en el comportamiento agresivo de los jóvenes, aunque no hay consenso en la comunidad científica.</p>

                <h3>4. Aislamiento Social</h3>
                <p>Si bien los videojuegos pueden fomentar la interacción social en línea, también pueden llevar a un aislamiento en la vida real si no se equilibran con actividades fuera del mundo digital.</p>

                <h3>5. Problemas de Sueño</h3>
                <p>El uso prolongado de pantallas antes de dormir puede afectar la calidad del sueño debido a la luz azul emitida por los dispositivos.</p>
            </section>

            <section>
                <h2>Videojuegos en la Educación</h2>
                <p>Los videojuegos han comenzado a ser utilizados en la educación para mejorar la enseñanza. Juegos como "Minecraft: Education Edition" permiten a los estudiantes aprender matemáticas, historia y ciencias de manera interactiva.</p>
                <p>Además, los videojuegos pueden ayudar a desarrollar habilidades como la lógica, el pensamiento crítico y la colaboración en grupo.</p>
            </section>

            <section>
                <h2>Videojuegos y Salud Mental</h2>
                <p>El impacto de los videojuegos en la salud mental depende del tipo de juego y el tiempo dedicado a ellos. Juegos diseñados para la relajación pueden reducir el estrés, mientras que otros pueden generar ansiedad si no se juega con moderación.</p>
                <p>Estudios han encontrado que los videojuegos pueden ser una herramienta útil en la terapia para tratar la depresión y la ansiedad en jóvenes.</p>
            </section>

            <section>
                <h2>Estadísticas sobre los Videojuegos y los Jóvenes</h2>
                <ul>
                    <li>El 90% de los jóvenes entre 12 y 17 años juegan videojuegos regularmente.</li>
                    <li>El 60% de los padres creen que los videojuegos pueden ser beneficiosos para el desarrollo de sus hijos.</li>
                    <li>Los videojuegos generan más ingresos que la industria del cine y la música combinadas.</li>
                    <li>El 70% de los jugadores juegan videojuegos para relajarse y aliviar el estrés.</li>
                </ul>
            </section>

            <section>
                <h2>El Futuro de los Videojuegos</h2>
                <p>La industria de los videojuegos sigue creciendo con avances en inteligencia artificial, realidad virtual y juegos en la nube. Se espera que en el futuro los videojuegos sean aún más inmersivos y tengan aplicaciones en áreas como la educación, la medicina y la psicología.</p>
            </section>

            <section>
                <h2>Consejos para un Uso Responsable de los Videojuegos</h2>
                <ul>
                    <li>Establecer límites de tiempo de juego diario.</li>
                    <li>Equilibrar el tiempo de juego con otras actividades, como ejercicio y lectura.</li>
                    <li>Elegir juegos apropiados para la edad y madurez del jugador.</li>
                    <li>Jugar en compañía de familiares o amigos para fomentar la socialización.</li>
                    <li>Evitar el juego antes de dormir para mejorar la calidad del sueño.</li>
                </ul>
            </section>

            <section>
                <h2>Conclusión</h2>
                <p>Los videojuegos son una parte importante de la vida de muchos jóvenes y pueden ser beneficiosos si se utilizan de manera equilibrada. Sin embargo, es crucial regular el tiempo de juego y elegir títulos adecuados para evitar problemas de adicción y salud.</p>
                <p>Al final, el impacto de los videojuegos en los jóvenes depende de cómo se usen y del contexto en el que se jueguen. Con una supervisión adecuada, los videojuegos pueden ser una herramienta poderosa para el aprendizaje, el entretenimiento y el desarrollo personal.</p>
            </section>

        </>
    )
}

export default Home