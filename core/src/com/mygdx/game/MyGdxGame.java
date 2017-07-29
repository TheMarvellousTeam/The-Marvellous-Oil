package com.mygdx.game;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.ashley.core.Engine;
import com.mygdx.game.system.RenderSystem;

public class MyGdxGame extends ApplicationAdapter {

	Engine engine;
	RenderSystem render;

	@Override
	public void create () {
		render = new RenderSystem();
		
		engine = new Engine();
		engine.addSystem(render);
	}

	@Override
	public void render () {
		engine.update(Gdx.graphics.getDeltaTime());
	}

	@Override
	public void dispose () {
		render.dispose();
	}
}
