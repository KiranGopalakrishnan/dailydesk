package common.bifrost.client

import BifrostGrpcKt
import io.grpc.ManagedChannel
import java.io.Closeable
import java.util.concurrent.TimeUnit

private class Bifrost( private val channel: ManagedChannel) : Closeable {
    private val stub:BifrostGrpcKt.BifrostCoroutineStub = BifrostGrpcKt.BifrostCoroutineStub(channel)
    suspend fun verify(request: BifrostOuterClass.Token): BifrostOuterClass.User {
        val request = BifrostOuterClass.Token.newBuilder().setToken("awdasdasd").build()
        return stub.verify(request)
    }

    override fun close() {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS)
    }
}