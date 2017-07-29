package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.utils.viewport.FitViewport;
import com.mygdx.game.actor.Earth;

public class MyGdxGame extends ApplicationAdapter {
	public final static int WIDTH = 1024,
							HEIGHT = 768;

	Stage stage;

	@Override
	public void create () {
		stage = new Stage(new FitViewport(WIDTH, HEIGHT));
		
		Earth earth = new Earth();
		stage.addActor(earth);
	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(1, 1, 1, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		
		stage.act(Gdx.graphics.getDeltaTime());
		stage.draw();
	}

	@Override
	public void dispose () {
		stage.dispose();
	}
}
